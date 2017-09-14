import React from 'react';
import { connect } from 'react-redux';

import { loginUserRequest } from '../actions';

import './styles/login-page.css';

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
                <h1>Learn Croatian</h1>
                <h2>Pick up a new skill with repetition</h2>
            </div>
            <a href={'/api/auth/google'}>Login with Google</a>;
            {/* <form onSubmit={e => this.loginSubmit(e)}>
                <input className="login-button" type="submit" value="Go to Google" />
            </form> */}
        </div>
        );
    }
}

const mapStateToProps = function(state){
    return {
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps)(LoginPage);