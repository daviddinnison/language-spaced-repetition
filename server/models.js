const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    authToken: { type: String, required: true }
});

const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
// const Question = mongoose.model('test', questionSchema);

module.exports = {User};