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
    currentUser: null,
    loading: false,
    error: null,
    questionsData: [{}]
  };

export const mainReducer = (state = initialState, action) => {
    if (action.type === LOGIN_USER_REQUEST) {
        return Object.assign({}, state, { loading: true });
    } else if (action.type === LOGIN_USER_SUCCESS) {
        return Object.assign({}, state, {
            currentUser: action.userId,
            loading: false // does this need to be here? update all depending on joe's response
        });
    } else if (action.type === LOGIN_USER_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.message
        });
    } else if (action.type === LOGOUT_USER) {
        return {
            currentUser: null,
            loggedIn: false
        };
    } else if (action.type === GET_QUESTIONS_REQUEST) {
        return Object.assign({}, state, { loading: true });
    } else if (action.type === GET_QUESTIONS_SUCCESS) {
        return Object.assign({}, state, {
            questionsData: action.questions,
            loading: false
        });
    } else if (action.type === GET_QUESTIONS_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.message
        });
    } else if (action.type === MAKE_GUESS) {
        return Object.assign({}, state, {
            // loading: false,
            answer: action.answer
        });
    }
    return state;
};
