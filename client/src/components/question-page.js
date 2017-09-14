import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Header from './header';

import { fetchQuestions, makeGuess } from '../actions';

import './styles/question-page.css';

export class QuestionPage extends React.Component {

    componentDidMount() {

        console.log(this.props.questionsData, 'questionsData---------------------')
        this.props.dispatch(fetchQuestions(this.props.questionsData));
        console.log(this.props.questionsData[0].answer, 'questionsData answer')
        //comment back in auth stuff
        // const accessToken = Cookies.get('accessToken');
        // fetch('/api/questions', {
        //         // headers: {
        //         //     'Authorization': `Bearer ${accessToken}`
        //         // }
        //     }).then(res => {
        //     if (!res.ok) {
        //         throw new Error(res.statusText);
        //     }
        //     return res.json();
        // }).then(questions =>
        //     this.setState({
        //         questions
        //     })
        // );

    }

    makeGuess(event) {
        event.preventDefault();
        let userGuess = this.userGuess.value;
        console.log(userGuess)
        //CHECK ANSWER WITH CORRECT ANSWER IN STATE AND SEND BOOLEAN BACK TO SERVER
        //checkUserResponse
        if (userGuess === this.props.questionsData[0].answer) {
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
        if (true === true) {
            // if (typeof this.props.answer === 'string') {
            // return <Spinner spinnerName="circle" noFadeIn />;
            
            //alg
            console.log(this.props.questionsData)

            return (
            <div className="question-container">
                <form className="guess-form" onSubmit={e => this.makeGuess(e)}>
                    <label className="question-ask" htmlFor="userGuess">Word in Croatian: </label>
                    <p>{this.props.questionsData[0].question}</p>
                    <input type="text" name="guess-input" required placeholder="word in English" id="userGuess" ref={input => (this.userGuess = input)}></input>
                    <button type="submit" className="guess-button">Submit answer</button>
                </form>
            </div>
            );
        }
        if (this.props.answer === true) {
            return (
                <div className="question-container">
                    <h1>correct</h1>
                </div>
                );
        }
        if (this.props.answer === false) {
            return (
                <div className="question-container">
                    <h1>incorrect</h1>
                </div>
                );
        }
    }

    render() {        
        return (
            <div className="question-page">
                <Header/>
                {this.renderQuestions()}
            </div>
        );
    }
}

const mapStateToProps = function (state){
    return {
        currentUser: state.currentUser,
        questionsData: state.questionsData,
        answer: state.answer
    }
  };

export default connect(mapStateToProps)(QuestionPage);