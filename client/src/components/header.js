import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import './styles/header.css';

import { logUserOut } from '../actions';

export class Header extends React.Component {
  logUserOut(e) {
    e.preventDefault();
    console.log('you logged out')
    // location.reload('/');
    window.location.replace("/");
    Cookies.remove('accessToken');
    this.props.dispatch(logUserOut());
  }
    render() {
      return (
        <div className="header">
          <h1>Learn Croatian</h1>
          <a href ="#"className="logout-button" onClick={e => this.logUserOut(e)}>Logout</a>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
    currentUser: state.currentUser,
    loggedIn: state.loggedIn
  });

export default connect()(Header);