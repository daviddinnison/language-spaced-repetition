import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionPage from './question-page';
import Gateway from './gateway';
import Dashboard from './dashboard';
import LoginPage from './login-page';
import Header from './header';
import Test from './test';
import { logUserIn } from '../actions';

class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        this.props.dispatch(logUserIn(accessToken));
    }
    render() {
        return (
            <Router>
                
                <main>
                    <Route exact path="/" component={Gateway} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/questions" component={QuestionPage} />
                    <Route exact path="/test" component={Test} />
                </main>

            </Router>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(App);