import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import QuestionPage from './question-page';
import LoginPage from './login-page';
import { logUserIn } from '../actions';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        console.log(accessToken, 'accessToken')
        this.props.dispatch(logUserIn(accessToken));
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        return <QuestionPage />;
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(App);