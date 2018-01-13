import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './header';

import {
    getQuestions,
    guessCorrect,
    guessWrong,
    updateQuestion
} from '../actions';

import './styles/question-page.css';
import checkmark from './images/checkmark.svg';
import incorrect from './images/incorrect.png';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggleHint = this.toggleHint.bind(this);
    }

    toggleHint() {
        this.setState({ visible: !this.state.visible })
    }


    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(getQuestions(accessToken));
    }


    makeGuess(event) {
        event.preventDefault();
        const acceptableAnswers = this.props.questionsData.answer;
        const userGuess = this.userGuess.value.toLowerCase();
        const correctAnswer = (acceptableAnswers.indexOf(userGuess) > -1);
        this.setState({ visible: false })

        if (correctAnswer) {
            this.props.dispatch(guessCorrect());
        } else {
            this.props.dispatch(guessWrong());
        }
    }

    updateQuestions() {
        this.props.dispatch(updateQuestion());
    }

    renderQuestions() {
        // if(this.props.loading === true) {
        // return (<div>loading...</div>);
        // }

        if (this.props.questionsData.correctAnswer === null) {
            return (
                <div className="question-container">
                    <form
                        className="guess-form"
                        onSubmit={e => this.makeGuess(e)}
                    >

                        <p className="question-type">{this.props.questionsData.type}</p>
                        <p className="croatian-question">{this.props.questionsData.question}</p>
                        <input
                            type="text"
                            name="guess-input"
                            required
                            placeholder="enter word in English"
                            id="userGuess"
                            ref={input => (this.userGuess = input)}
                        />
                        <button type="submit" className="guess-button">
                            Submit answer
                        </button>
                    </form>
                    <button onClick={this.toggleHint} className="hint-button">Hint</button>
                    {this.state.visible && <p>{this.props.questionsData.hint}</p>}
                </div>
            );
        }
        if (this.props.questionsData.correctAnswer === true) {
            const correctFeedback = ['Good job!', "You got it!", "Nice work!", "You're a natural!"]
            const randomCorrectItem = correctFeedback[Math.floor(Math.random() * correctFeedback.length)];

            return (
                <div className="question-container">
                    <h1 className="correct-response">Good job!</h1>
                    <img src={checkmark} alt="correct answer" className="checkmark" />
                    {randomCorrectItem}
                    <button className="next-button" onClick={e => this.updateQuestions(e)}>
                        Next
                    </button>
                </div>
            );
        }
        if (this.props.questionsData.correctAnswer === false) {
            const incorrectFeedback = ['Try again!', "Better luck next time!", "Keep practicing!"]
            const randomIncorrectItem = incorrectFeedback[Math.floor(Math.random() * incorrectFeedback.length)];

            return (
                <div className="question-container">
                    <img src={incorrect} alt="incorrect answer" className="incorrect" />
                    <p className="croatian-question">{this.props.questionsData.question}</p>
                    <p>The correct answer is: {this.props.questionsData.answer[0]}</p>
                    {randomIncorrectItem}
                    <button className="next-button" onClick={e => this.updateQuestions(e)}>
                        Next
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="question-page">
                <Header />

                {this.renderQuestions()}
            </div>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        currentUser: state.currentUser,
        questionsData: state.questionsData,
        answer: state.answer,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(QuestionPage);
