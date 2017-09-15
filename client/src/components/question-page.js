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
            // alert('you got it!');
            this.props.dispatch(guessCorrect());
        } else {
            // alert('nope');
            this.props.dispatch(guessWrong());
        }
        this.props.dispatch(updateQuestion());
    }

    renderQuestions() {
        // if(this.props.loading === true) {
        // return (<div>loading...</div>);
        // }

        if (this.props.questionsData) {
            // if (typeof this.props.answer === 'string') {
            // return <Spinner spinnerName="circle" noFadeIn />;

            //alg
            // console.log(this.props.questionsData)

            return (
                <div className="question-container">
                    <form
                        className="guess-form"
                        onSubmit={e => this.makeGuess(e)}
                    >
                        <label className="question-ask" htmlFor="userGuess">
                            Word in Croatian:{' '}
                        </label>
                        <p>{this.props.questionsData.question}</p>
                        <input
                            type="text"
                            name="guess-input"
                            required
                            placeholder="word in English"
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
        // if (this.props.answer === true) {
        //     return (
        //         <div className="question-container">
        //             <h1>correct</h1>
        //         </div>
        //         );
        // }
        // if (this.props.answer === false) {
        //     return (
        //         <div className="question-container">
        //             <h1>incorrect</h1>
        //         </div>
        //         );
        // }
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
