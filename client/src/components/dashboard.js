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

import './styles/dashboard.css';

export class Dashboard extends React.Component {

    // componentDidMount() {
    //     const accessToken = Cookies.get('accessToken');

    //     console.log('DISPATCH GET QUESTIONS IN DASHBOARD COMPONENT');
    //     this.props.dispatch(getQuestions(accessToken));
    // }

    renderResults() {
        // console.log('THE NEW QUESTION DATA', this.props.questionsData)
        return (
            <div className="dashboard">
                <p>Welcome! </p>
                <p>
                    Learn some basic Croatian vocabulary with spaced repetition.
                    TEST.
                    You will see what type of word you are answering, and if you aren't sure you can get a hint.
                    Get started below! 
                    Like and share for a free iphone 4.

                </p>
                <ul>
                    <li>greetings</li>
                    <li>animals</li>
                    <li>sports</li>
                    <li>professions</li>
                    <li>relationships</li>
                    <li>places</li>
                    <li>transportation</li>

                </ul>
                <Link to="/questions" className="start-button">Learn Croatian</Link>
            </div>
        );

    }

    render() {
        return (
            <div className="question-page">
                <Header />
                {this.renderResults()}
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

export default connect(mapStateToProps)(Dashboard);
