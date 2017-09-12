import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_ERROR,
    
  } from "../actions/actions";
  
  const initialState = {
    username: 'david',  
    questionsMessage: 'Is this is a question from the state? Yes.',
    answer: null
  };


  export default (state, action) => {
    state = state || initialState;
        console.log(state)
            
        if (action.type === LOGIN_USER_REQUEST) {
            return {
              ...state,
            };
        }   else if (action.type === LOGIN_USER_SUCCESS) {
            return {
              users: [...state.users, action.users],
              loading: false,
              error: null
            };
        }   else if (action.type === LOGIN_USER_ERROR) {
            return {
              loading: false,
              error: action.message
            };
        }   else if (action.type === LOGOUT_USER) {
            return {
              username: null,
              loggedIn: false
            }; 
        }   else if (action.type === LOGIN_USER_REQUEST) {
            return {
              ...state,
              display: "setPomo"
            };
        }   else if (action.type === LOGIN_USER_SUCCESS) {
            return {
              users: [...state.users, action.users],
              display: "setPomo",
              loading: false,
              error: null
            };
        }   else if (action.type === LOGIN_USER_ERROR) {
            return {
              loading: false,
              error: action.message
            } 
        }   else if (action.type === LOGOUT_USER) {
            return {
              username: '',
              loggedIn: false
            }
        }   else if (action.type === GET_QUESTIONS_REQUEST) {
            return Object.assign({}, state, {
            // loading: true,
            error: null
            });
        } else if (action.type === GET_QUESTIONS_SUCCESS) {
            return Object.assign({}, state, {
            questions: action.questions,
            // loading: false,
            error: null
            });
        } else if (action.type === GET_QUESTIONS_ERROR) {
            return Object.assign({}, state, {
                // loading: false,
            error: action.error
        });
    return state;
  };
}