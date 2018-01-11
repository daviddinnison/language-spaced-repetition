import React from 'react';
import { connect } from 'react-redux';
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router-dom';

import { loginUserRequest } from '../actions';

import './styles/login-page.css';
import flag from './images/croatia-flag.svg';
import Header from './header';

export class LoginPage extends React.Component {

    loginSubmit(event) {
        event.preventDefault();
        this.props.dispatch(loginUserRequest());
        // /api/auth/google
    }
    render() {
        console.log("LOGGED IN PROPS", this.props)
        // console.log(state, 'THIS IS THE STATE IN LOGIN PAGE')
        return (
            <div className="login-page">
                <Header />
                <div className="info">
                    <h2>Dobrodošli! Welcome!</h2>
                    <p>Standard Croatian is the official language of the Republic of Croatia. There are 5.5 million Croatian speakers worldwide.</p>
                    <p>Learn basic Croatian with repetition. If you get it wrong, you can practice more often. If you are already vješt, stick to the ones you don't know.</p>
                    <a href={'/api/auth/google'} className="login-button">Login with Google</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        currentUser: state.currentUser,
        loggedIn: state.loggedIn
    }
};

export default connect(mapStateToProps)(LoginPage);