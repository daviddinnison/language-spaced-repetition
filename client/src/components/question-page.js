import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Header from './header';

import {
    getQuestions,
    makeGuess,
    guessCorrect,
    guessWrong,
    updateQuestion
} from '../actions';

import './styles/question-page.css';
import checkmark from'./styles/checkmark.svg';
import incorrect from'./styles/incorrect.png';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this.props.questionsData, 'questionsData---------------------')
        // console.log(this.props.questionsData[0].answer, 'questionsData answer')
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(getQuestions(accessToken));
        // console.log(this.props)
    }

    makeGuess(event) {
        event.preventDefault();
        let userGuess = this.userGuess.value;
        if (userGuess === this.props.questionsData.answer) {
            this.props.dispatch(guessCorrect());
        } else {
            this.props.dispatch(guessWrong());
        }
        // this.props.dispatch(updateQuestion());
    }

    updateQuestions() {
        this.props.dispatch(updateQuestion());
    }

    renderQuestions() {
        // if(this.props.loading === true) {
        // return (<div>loading...</div>);
        // }

        if (this.props.questionsData.correctAnswer === null) {
            console.log(this.props.questionsData)

            return (
                <div className="question-container">
                    <form
                        className="guess-form"
                        onSubmit={e => this.makeGuess(e)}
                    >

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
                </div>
            );
        }
        if (this.props.questionsData.correctAnswer === true) {
            return (
                <div className="question-container">
                    <h1 className="correct-response">Good job!</h1>
                    <img  src={checkmark} alt="correct answer" className="checkmark"/>
                    <p>Seems you have it down. We won't ask you for a while.</p>
                    <button className="next-button"  onClick={e => this.updateQuestions(e)}>
                            Next
                    </button>
                </div>
                );
        }
        if (this.props.questionsData.correctAnswer === false) {
            return (
                <div className="question-container">
                    <img  src={incorrect} alt="incorrect answer" className="incorrect"/>
                    <p className="croatian-question">{this.props.questionsData.question}</p>
                    <p>The correct answer is: {this.props.questionsData.answer}</p>
                    <p>Study up and we'll ask again soon.</p>
                    <button className="next-button"  onClick={e => this.updateQuestions(e)}>
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

        // let answer = this.userGuess.value;
        // console.log(answer);

        // this.props.dispatch(makeGuess(answer));
    }
}
const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        questionsData: state.questionsData,
        answer: state.answer,
        loading: state.loading
    };
};

export default connect(mapStateToProps)(QuestionPage);
