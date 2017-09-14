const express = require('express');
const mongoose = require('mongoose');
const { User, Question } = require('../models');

const app = express();

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

// const isUser = googleId => {
//     let check;
//     return User.findOne({ googleId: googleId })
//         .then(result => {
//             if (result) {
//                 return true;
//             } else {
//                 return false;
//             }
//         })
//         .then(result => {
//             check = result;
//         })
//         .catch(err => console.error(err));

//     return check;
// };

// console.log('======', isUser('yeah'));