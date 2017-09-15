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
        // console.log(this.props.questionsData, 'questionsData---------------------')
        // console.log(this.props.questionsData[0].answer, 'questionsData answer')
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(getQuestions(accessToken));
        // console.log(this.props)
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
        let userGuess = this.userGuess.value;
        console.log(userGuess)
        //CHECK ANSWER WITH CORRECT ANSWER IN STATE AND SEND BOOLEAN BACK TO SERVER
        //checkUserResponse
        if (userGuess === this.props.questionsData.answer) {
            alert ('you got it!')
            //SEND TRUE TO SERVER
            //userResponseTrue
            //ROUTE TO CORRECT ANSWER PAGE
            //GET NEXT QUESTION
        } else {
            alert('nope')
            //SEND FALSE
            //userResponseFalse
            //ROUTE TO CORRECT ANSWER PAGE
            //GET NEXT QUESTION
        }
        //getNextQuestion


        // this.props.dispatch(makeGuess(answer));
    }

    renderQuestions() {
        // if(this.props.loading === true) {
        // return (<div>loading...</div>);
        // }
        
        if (this.props.questionsData.correctAnswer === null) {
            // if (typeof this.props.answer === 'string') {
            // return <Spinner spinnerName="circle" noFadeIn />;
            
            //alg
            // console.log(this.props.questionsData)
            console.log(this.props)

            return (
            <div className="question-container">
                <form className="guess-form" onSubmit={e => this.makeGuess(e)}>
                    <label className="question-ask" htmlFor="userGuess">Word in Croatian: </label>
                    <p>{this.props.questionsData.question}</p>
                    <input type="text" name="guess-input" required placeholder="word in English" id="userGuess" ref={input => (this.userGuess = input)}></input>
                    <button type="submit" className="guess-button">Submit answer</button>
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
                <Header/>
                {this.renderQuestions()}
            </div>
        );
    
        let answer = this.userGuess.value;
        console.log(answer);

        this.props.dispatch(makeGuess(answer));
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