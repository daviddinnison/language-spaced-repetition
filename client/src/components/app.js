import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';

import QuestionPage from './question-page';
import LoginPage from './login-page';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }
 
    componentDidMount() {
        // Job 4: Redux-ify all of the state and fetch calls to async actions.
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(currentUser =>
                this.setState({
                    currentUser
                })
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
            return <LoginPage />;
        }
        return <QuestionPage />;
    }
}

const mapStateToProps = function(state){
    
        // console.log(state, 'state from app.js')
    
        // currentUser: state.currentUser
    
};

export default connect(mapStateToProps)(App);

//simple placeholder
// import React from 'react';



// export class App extends React.Component {
//   render() {
//     return (
//       <h1>{this.props.currentUser}</h1>
//     )
//   }
// }


// const mapStateToProps = function(state) {
//     return {
//         currentUser: state.currentUser
//     }
// };

// export default connect(mapStateToProps)(App);