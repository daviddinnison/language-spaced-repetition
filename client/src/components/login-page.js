import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUserRequest } from '../state/actions/actions';

import './styles/login-page.css';

export class LoginPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(
          loginUserRequest(this.props.username)
        );
      }
    
    loginSubmit(event) {
        event.preventDefault();
        this.props.dispatch(loginUserRequest());
        // /api/auth/google
    }
    render() {
        return ( 
        <div className="login-page">
            <div className="landing-header">
                <h1>Learn Croatian</h1>
                <h2>Pick up a new skill with repetition</h2>
            </div>
            {/* <form action={'/api/auth/google'} onSubmit={e => this.loginSubmit(e)}> */}
            <form onSubmit={e => this.loginSubmit(e)}>
                <input className="login-button" type="submit" value="Go to Google" />
            </form>
        </div>
        );
    }
}

const mapStateToProps = function(state){
    console.log(state, 'state')
    return {
       //  username: state.username
    }
};

export default connect(mapStateToProps)(LoginPage);