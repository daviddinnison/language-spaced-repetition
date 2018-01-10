import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';


import Header from './header';

import {
    getQuestions,
    guessCorrect,
    guessWrong,
    updateQuestion
} from '../actions';

import './styles/question-page.css';

export class Dashboard extends React.Component {

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(getQuestions(accessToken));
    }

    renderResults() {
            
            return (
                <div className="question-container">
                    <p>test</p>
                    <Link to="/questions">Questions</Link>
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
