import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUserRequest } from '../state/actions/actions';

import './styles/login-page.css';

export class LoginPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(
          loginUserRequest(this.props.currentUser)
        );
    }
    
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
            {/* <form action={'/api/auth/google'} onSubmit={e => this.loginSubmit(e)}> */}
            <form onSubmit={e => this.loginSubmit(e)}>
                <input className="login-button" type="submit" value="Go to Google" />
            </form>
        </div>
        );
    }
}

// const mapStateToProps = function(state){
//     return {
//         currentUser: state.currentUser
//     }
// };

// export default connect(mapStateToProps)(LoginPage);