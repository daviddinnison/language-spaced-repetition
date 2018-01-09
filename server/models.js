const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: { type: String, required: true },
    accessToken: { type: String, required: true },
    displayName: { type: String },
    questions: { type: Array }
});

const questionSchema = mongoose.Schema({
    questionsData: [{
        question: { type: String, required: true },
        
        answer: { type: [String], index:true, required: true },
        nValue: { type: Number, required: true },
        position: { type: Number, required: true }
    }]
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { User, Question };