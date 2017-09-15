const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const { User, Question } = require('./models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { LinkedList, printList, display } = require('./linked-list');

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
);

// unique user doc has to have its unique questions, prob in linked list form
//      if user's questions is empty, fill it up with the default questions, NOT linked list
//      otherwise, serve up the questions one at a time, after instantiating the linked list

app.get(
    '/api/questions',
    // passport.authenticate('bearer', { session: false }),
    (req, res) => {
        User.find({ googleId: '110530375003272794045' })
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
                                { googleId: '110530375003272794045' },
                                { questions: questionArray },
                                { new: true }
                            );
                        });
                } else {
                    return User.find({ googleId: '110530375003272794045' });
                }
            })
            .then(result => {
                const questionsArray = result[0].questions;
                return questionsArray;
            })
            .then(questionsArray => {
                const questionList = new LinkedList();

                for (let i = 0; i < questionsArray.length; i++) {
                    questionList.insert(i, questionsArray[i]);
                }

                res.json(questionList.get(0));
            })
            .catch(err => console.error(err));
    }
);

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
        app.listen(3001, err => {
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
