import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Header from './header';

import './styles/question-page.css';
import checkmark from'./styles/checkmark.svg';
import incorrect from'./styles/incorrect.png';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
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

export default connect(mapStateToProps)(Dashboard);
