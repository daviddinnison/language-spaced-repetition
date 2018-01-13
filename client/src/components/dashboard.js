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
    renderResults() {
        return (
            <div className="info dashboard">
                <h2>Welcome to the dashboard</h2>
                <p>
                    Learn some basic Croatian vocabulary with spaced repetition.
                    You will see what type of word you are answering, and if you aren't sure you can get a hint.
                    Get started below! 
                </p>
                <h3>Vocabulary types:</h3>
                <ul>
                    <li>phrases</li>
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
