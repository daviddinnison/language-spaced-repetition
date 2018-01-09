import * as Cookies from 'js-cookie';

//USER LOGINS
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

export const LOG_USER_OUT = 'LOG_USER_OUT';
export const logUserOut = message => ({
    type: LOG_USER_OUT
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

//GETTING GUESTIONS
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

export const GUESS_CORRECT = 'GUESS_CORRECT';
export const guessCorrect = () => ({
    type: GUESS_CORRECT
});

export const GUESS_WRONG = 'GUESS_WRONG';
export const guessWrong = () => ({
    type: GUESS_WRONG
});

// UPDATE QUESTION
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const updateQuestionSuccess = nextQuestion => ({
    type: UPDATE_QUESTION_SUCCESS,
    nextQuestion
});

// don't forget auth
export const updateQuestion = () => (dispatch, getState) => { // this is to circumvent the issue where the state is modified, but we can't pass in a property of that updated state until a re-render happens, and the re-render won't happen in time
    const currentQuestion = getState().questionsData;
    const options = {
        headers: {
            // Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(currentQuestion)
    };

    // dispatch(updateQuestionRequest());
    fetch('/api/questions/update', options)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(question => {
            dispatch(updateQuestionSuccess(question));
        })
        .catch(err => {
            console.error(err);
            // dispatch(updateQuestionError(err));
        });
};
