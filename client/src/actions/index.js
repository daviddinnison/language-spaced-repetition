import * as Cookies from 'js-cookie';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
});

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = userId => ({
    type: LOGIN_USER_SUCCESS,
    userId
});

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUserError = message => ({
    type: LOGIN_USER_ERROR,
    message
});

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = message => ({
    type: LOGOUT_USER
});

export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST';
export const getQuestionsRequest = () => ({
    type: GET_QUESTIONS_REQUEST
});

export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const getQuestionsSuccess = questions => ({
    type: GET_QUESTIONS_SUCCESS,
    questions
});

export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const getQuestionsError = message => ({
    type: GET_QUESTIONS_ERROR,
    message
});

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = guess => ({
    type: MAKE_GUESS,
    guess
});

export const logUserIn = accessToken => dispatch => {
    dispatch(loginUserRequest());
    fetch('/api/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    Cookies.remove('accessToken');
                    return;
                }
                throw new Error();
            }
            return res.json();
        })
        .then(user => {
            dispatch(loginUserSuccess(user.googleId));
        })
        .catch(err => {
            dispatch(loginUserError(err));
        });
};

export const getQuestions = accessToken => dispatch => {
    dispatch(getQuestionsRequest());
    fetch('/api/questions', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(questions => {
            dispatch(getQuestionsSuccess(questions));
        })
        .catch(err => {
            dispatch(getQuestionsError(err));
        });
};