export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  user
});

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUserError = message => ({
  type: LOGIN_USER_ERROR
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
export const getQuestionsError = error => ({
  type: GET_QUESTIONS_ERROR,
  error
});


// export const fetchSessions = (username, password) => dispatch => {
//     const credentials = `${username}:${password}`;
//     const encodedAuthHeader = btoa(credentials);
//     const authString = `Basic ${encodedAuthHeader}`;
  
//     const opts = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: authString
//       },
//       method: 'GET'
//     };
  
//     dispatch(getSessionsRequest());
//     return fetch('/api/sessions/', opts)
//       .then(res => {
//         if (!res.ok) {
//           return Promise.reject(res.statusText);
//         }
//         return res.json();
//       })
//       .then(sessions => {
//         return dispatch(getSessionsSuccess(sessions));
//       })
//       .catch(err => {
//         dispatch(getSessionsError(err));
//       });
//   };