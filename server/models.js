const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: { type: String, required: true },
    accessToken: { type: String, required: true },
    displayName: { type: String }
});

const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
// const Question = mongoose.model('test', questionSchema);

module.exports = { User };
