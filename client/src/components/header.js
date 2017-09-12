import React from 'react';

import './styles/header.css';

export class Header extends React.Component {
  
    render() {
      return (
        <div className="header">
          <h1>Learn Croatian</h1>
        </div>
      );
    }
  }
  
//   const mapStateToProps = state => ({
//     username: state.username,
//     loggedIn: state.loggedIn
//   });
  
export default Header;