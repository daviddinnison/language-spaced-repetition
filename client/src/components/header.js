import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import './styles/header.css';

import { logUserOut } from '../actions';


export class Header extends React.Component {
  logUserOut(event) {
    event.preventDefault();
    Cookies.remove('accessToken');
    window.location.replace("/");
    this.props.dispatch(logUserOut());
  }

  conditionalLogout() {
    if (this.props.loggedIn) {
      return <a href="" onClick={e => this.logUserOut(e)} className="logout-button">Logout</a>
    }
  }

  render() {
    return (
      <header>
        <h1><a href="/" className="home-link">Croatian Buddy</a></h1>
        {this.conditionalLogout()}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(Header);