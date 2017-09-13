import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_ERROR,
    MAKE_GUESS
    
  } from "../actions";
  
  const initialState = {
    currentUser: 'david',  
    wordToGuess: 'Kako se zoveš? ',
    answer: 'Whats your name?'
  };


export const mainReducer = (state=initialState, action) => {
// export default (state, action) => {
    // state = state || initialState;
        // console.log(state, 'REDUCER')
            
        if (action.type === LOGIN_USER_REQUEST) {
            return {
              ...state,
            };
        }
        else if (action.type === LOGIN_USER_SUCCESS) {
            return {
              users: [...state.users, action.users],
              loading: false,
              error: null
            };
        }   
        else if (action.type === LOGIN_USER_ERROR) {
            return {
              loading: false,
              error: action.message
            };
        } 
        else if (action.type === LOGOUT_USER) {
            return {
              currentUser: null,
              loggedIn: false
            }; 
        }   
        else if (action.type === LOGIN_USER_REQUEST) {
            return {
              ...state,
              display: "setPomo"
            };
        }   
        else if (action.type === LOGIN_USER_SUCCESS) {
            return {
              users: [...state.users, action.users],
              display: "setPomo",
              loading: false,
              error: null
            };
        }
        else if (action.type === LOGIN_USER_ERROR) {
            return {
              loading: false,
              error: action.message
            } 
        }   
        else if (action.type === LOGOUT_USER) {
            return {
              currentUser: '',
              loggedIn: false
            }
        }
        else if (action.type === GET_QUESTIONS_REQUEST) {
            return Object.assign({}, state, {
            // loading: true,
            error: null
            });
        }
        else if (action.type === GET_QUESTIONS_SUCCESS) {
            return Object.assign({}, state, {
            questions: action.questions,
            // loading: false,
            error: null
            });
        }
        else if (action.type === GET_QUESTIONS_ERROR) {
            return Object.assign({}, state, {
                // loading: false,
            error: action.error
            });
        }
        else if (action.type === MAKE_GUESS) {
            return Object.assign({}, state, {
                // loading: false,
            answer: action.answer
            });
        }
    return state;
}
