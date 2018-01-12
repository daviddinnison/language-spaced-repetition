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
    console.log("LOGGED IN HEADER PROPS", this.props)
    if (this.props.loggedIn === true) {
      return (
        <a href="" onClick={e => this.logUserOut(e)}>Logout</a>
      );
    }
  }

  render() {
    return (
      <header>
        <h1>Croatian Buddy</h1>
        <div class="sub-head">
          {this.conditionalLogout()}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(Header);