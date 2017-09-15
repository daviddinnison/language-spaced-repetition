const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const { User, Question } = require('./models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { LinkedList, printList, display } = require('./linked-list');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

let secret = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};

if (process.env.NODE_ENV !== 'production') {
    secret = require('./secret');
}

const app = express();

app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
        {
            clientID: secret.CLIENT_ID,
            clientSecret: secret.CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        (accessToken, refreshToken, profile, cb) => {
            User.findOne({ googleId: profile.id })
                .then(isUser => {
                    if (isUser) {
                        User.findOneAndUpdate(
                            { googleId: profile.id },
                            { accessToken },
                            { new: true }
                        ).then(updatedUser => {
                            const user = {
                                googleId: updatedUser.googleId,
                                accessToken: updatedUser.accessToken
                            };
                            return cb(null, user);
                        });
                    } else {
                        User.create({
                            googleId: profile.id,
                            accessToken,
                            displayName: profile.displayName
                        }).then(newUser => {
                            const user = {
                                googleId: newUser.googleId,
                                accessToken: newUser.accessToken
                            };
                            return cb(null, user);
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    )
);

passport.use(
    new BearerStrategy((token, done) => {
        User.findOne({ accessToken: token }).then(result => {
            if (result === null) {
                return done(null, false);
            } else {
                const user = {
                    googleId: result.googleId,
                    accessToken: result.accessToken
                };
                return done(null, user);
            }
        });
    })
);

app.get(
    '/api/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get(
    '/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, { expires: 0 });
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get(
    '/api/me',
    passport.authenticate('bearer', { session: false }),
    (req, res) =>
        res.json({
            googleId: req.user.googleId
        })
        // .catch(err => console.error(err))
);

// unique user doc has to have its unique questions, prob in linked list form
//      if user's questions is empty, fill it up with the default questions, NOT linked list
//      otherwise, serve up the questions one at a time, after instantiating the linked list

let questionList;
app.get(
    '/api/questions',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        User.find({ googleId: req.user.googleId })
            .then(user => {
                return user[0].questions;
            })
            .then(questions => {
                if (questions.length === 0) {
                    return Question.find()
                        .then(list => {
                            return list[0].questionsData;
                        })
                        .then(questionArray => {
                            return User.findOneAndUpdate(
                                { googleId: req.user.googleId },
                                { questions: questionArray },
                                { new: true }
                            );
                        });
                } else {
                    return User.find({ googleId: req.user.googleId });
                }
            })
            .then(result => {
                const questionsArray = result[0].questions;
                return questionsArray;
            })
            .then(questionsArray => {
                questionList = new LinkedList();

                for (let i = 0; i < questionsArray.length; i++) {
                    //inserts from res to linked list
                    questionList.insert(i, questionsArray[i]);
                }

                //check to see what is currentQuestion and display it
                if (questionList.get().currentQuestion === true) {
                    res.json(questionList.get());
                }

                //what works:
                //going into redux state
                //rendered correctly
                //new properties of correctAnswer: null and currentQuestion are going into state
                //front end correct answer works

                //what next:
                //make a new question get or put
                //in the dispatch we want to send whetehr this answer was correct or not
                //want server to receive and move positions based off correctness
                //want server to call next question and rerender
                //front end next question rendering

                // console.log(questionList.get(), 'THIS DISPLAYS OUR QUESTION LIST ITEM')
            })
            .catch(err => console.error(err));
    }
);

app.put('/api/questions/update', jsonParser, (req, res) => {
    if (req.body.correctAnswer) {
        questionList.insert(12, req.body);
        questionList.remove(0);
    } else {
        questionList.insert(2, req.body);
        questionList.remove(0);
    }
    res.json(questionList.get(0));
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer() {
    let databaseUri =
        process.env.DATABASE_URI ||
        global.databaseUri ||
        'mongodb://dev:dev@ds133094.mlab.com:33094/lang';
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUri).then(function() {
        app.listen(process.env.PORT || 3001, err => {
            if (err) {
                console.error(err);
                return err;
            }
            console.log('Listening on localhost:3001');
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app,
    runServer,
    closeServer
};
