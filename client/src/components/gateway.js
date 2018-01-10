import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Dashboard from './dashboard';
import LoginPage from './login-page';
import { logUserIn } from '../actions';

class Gateway extends React.Component {
    // componentDidMount() {
    //     const accessToken = Cookies.get('accessToken');
    //     this.props.dispatch(logUserIn(accessToken));
    // }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        return <Dashboard />;
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(Gateway);
