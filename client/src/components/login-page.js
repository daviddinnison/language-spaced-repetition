import React from 'react';
import { connect } from 'react-redux';


import { loginUserRequest } from '../actions';

import './styles/login-page.css';
import flag from'./styles/croatia-flag.svg';
import map from'./styles/croatia-map.jpg';



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
            <a href={'/api/auth/google'} className="login-button">Login with Google</a>;
            <div className="info">
                <p>Standard Croatian is the official language of the Republic of Croatia. There are 5.5 million Croatian speakers worldwide.</p>
                <p>Learn basic Croatian with repetition. If you get it wrong, we will ask more often. If you have it down, we will ask less frequently.</p>
                <img  src={flag} alt="croatian flag" className="flag"/>
                {/* <img  src={map} alt="croatian map" className="map"/> */}
            </div>
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