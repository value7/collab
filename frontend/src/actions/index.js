import { checkHttpStatus, parseJSON } from '../utils';

export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const INVALIDATE_MESSAGE = 'INVALIDATE_MESSAGE';

export const REQUEST_SECURED_MESSAGE = 'REQUEST_SECURED_MESSAGE';
export const RECEIVE_SECURED_MESSAGE = 'RECEIVE_SECURED_MESSAGE';
export const INVALIDATE_SECURED_MESSAGE = 'INVALIDATE_SECURED_MESSAGE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';


import { push } from 'react-router-redux';
import cookie from 'react-cookie';

// export const invalidateMessage = () => ({
//   type: INVALIDATE_MESSAGE
// })
//
// export const requestMessage = () => ({
//   type: REQUEST_MESSAGE
// })
//
// export const receiveMessage = (json) => ({
//   type: RECEIVE_MESSAGE,
//   text: json.message,
//   receivedAt: Date.now()
// })
//
// const fetchMessage = () => dispatch => {
//   dispatch(requestMessage())
//   return fetch(`/api/hello`)
//     .then(response => response.json())
//     .then(json => dispatch(receiveMessage(json)))
// }
//
// const shouldFetchMessage = (state) => {
//   const message = state.message;
//   if (message.text !== "hello") {
//     return true
//   }
//   if (message.isFetching) {
//     return false
//   }
//   return message.didInvalidate
// }
//
// export const fetchMessageIfNeeded = () => (dispatch, getState) => {
//   console.log(getState());
//   if (shouldFetchMessage(getState())) {
//     return dispatch(fetchMessage())
//   }
// }
