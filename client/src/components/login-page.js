import React from 'react';
import { connect } from 'react-redux';
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router-dom';

import { loginUserRequest } from '../actions';

import './styles/login-page.css';
import flag from './images/croatia-flag.svg';




export class LoginPage extends React.Component {

    loginSubmit(event) {
        event.preventDefault();
        this.props.dispatch(loginUserRequest());
        // /api/auth/google
    }
    render() {
        // console.log(state, 'THIS IS THE STATE IN LOGIN PAGE')
        return (
            <div className="login-page">
                <div className="landing-header">
                    {/* <img src={flag} alt="croatian flag" className="flag" /> */}

                    <h1>Croatian Buddy</h1>
                    <ul className="info-ul">
                        <li>learning</li>
                        <li>practice</li>
                        <li>communication</li>
                    </ul>
                </div>
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
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps)(LoginPage);