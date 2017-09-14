import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Header from './header';

import { getQuestions, makeGuess } from '../actions';

import './styles/question-page.css';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(getQuestions(accessToken));
    }

    render() {
        // const questions = this.state.questions.map((question, index) => (
        //     <li key={index}>{question}</li>
        // ));

        // return <ul className="question-list">{questions}</ul>;
        return <p>hello</p>;
    }

    makeGuess(event) {
        event.preventDefault();
        let answer = this.userGuess.value;
        console.log(answer);

        this.props.dispatch(makeGuess(answer));
    }

    // render() {
    //     //this is the real function for mapping questions to state. paste this stuff into below function
    //     // const questions = this.state.wordToGuess.map((question, index) =>
    //     //     <div className="question-container">
    //     // <span className="question-ask">Word in Croatian:</span>
    //     // <p key={index}>{question}</p>

    //     // <form className="guess-form" onSubmit={e => this.makeGuess(e)}>
    //     //     <input type="text" name="guess-input" placeholder="word in English"></input>
    //     //     <button type="submit" className="guess-button">Submit answer</button>
    //     // </form>
    //     //     </div>
    //     // );

    //     //make a placeholder until the questions endpoint is working

    //     return (
    //         <div className="question-page">
    //             <Header />

    //             <div className="question-container">
    //                 <form
    //                     className="guess-form"
    //                     onSubmit={e => this.makeGuess(e)}
    //                 >
    //                     <label className="question-ask" htmlFor="userGuess">
    //                         Word in Croatian:{' '}
    //                     </label>
    //                     <p>{this.props.wordToGuess}</p>

    //                     <input
    //                         type="text"
    //                         name="guess-input"
    //                         required
    //                         placeholder="word in English"
    //                         id="userGuess"
    //                         ref={input => (this.userGuess = input)}
    //                     />
    //                     <button type="submit" className="guess-button">
    //                         Submit answer
    //                     </button>
    //                 </form>
    //                 {/* {questions} */}
    //             </div>
    //         </div>
    //     );
    // }
}

const mapStateToProps = function(state) {
    return {
        wordToGuess: state.wordToGuess,
        answer: state.answer
    };
};

export default connect(mapStateToProps)(QuestionPage);
