import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOG_USER_OUT,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_ERROR,
    GUESS_CORRECT,
    GUESS_WRONG,
    UPDATE_QUESTION_SUCCESS
} from '../actions';

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
    } else if (action.type === LOG_USER_OUT) {
        return  Object.assign({}, state, {
            currentUser: null,
            loggedIn: false
        });
    } else if (action.type === GET_QUESTIONS_REQUEST) {
        return Object.assign({}, state, { loading: true });
    } else if (action.type === GET_QUESTIONS_SUCCESS) {
        // console.log('REDUCER QUESTIONS GET SUCCESS', action.questions)
        return Object.assign({}, state, {
            questionsData: action.questions,
            loading: false
        });
    } else if (action.type === GET_QUESTIONS_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.message
        });
    } else if (action.type === GUESS_CORRECT) {
        return Object.assign({}, state, {
            questionsData: Object.assign({}, state.questionsData, {
                correctAnswer: true
            })
        });
    } else if (action.type === GUESS_WRONG) {
        return Object.assign({}, state, {
            questionsData: Object.assign({}, state.questionsData, {
                correctAnswer: false
            })
        });
    } else if (action.type === UPDATE_QUESTION_SUCCESS) {
        return Object.assign({}, state, { questionsData: action.nextQuestion });
    }
    return state;
};
