const express = require('express');
const mongoose = require('mongoose');
const { User, Question } = require('../models');
const { LinkedList } = require('../linked-list');

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

// unique user doc has to have its unique questions, prob in linked list form
//      if user's questions is empty, fill it up with the default questions
//      otherwise, serve up the questions one at a time

const testList = new LinkedList;

testList.insert(0, 'zero')
testList.insert(1, 'one')

console.log('LOOK HERE', testList.get(0))