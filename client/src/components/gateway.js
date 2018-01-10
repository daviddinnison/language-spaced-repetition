import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionPage from './question-page';
import Dashboard from './dashboard';
import LoginPage from './login-page';
import Header from './header';
import { logUserIn } from '../actions';

export function Gateway(props)  {

    return (
        <Router>
            <div className="app">
                <main>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/questions" component={QuestionPage} />
                    <Route exact path="/header" component={Header} />
                </main>
            </div>
        </Router>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(Gateway);