import { checkHttpStatus, parseJSON } from '../utils';

export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const INVALIDATE_MESSAGE = 'INVALIDATE_MESSAGE';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';


import { push } from 'react-router-redux';

export const invalidateMessage = () => ({
  type: INVALIDATE_MESSAGE
})

export const requestMessage = () => ({
  type: REQUEST_MESSAGE
})

export const receiveMessage = (json) => ({
  type: RECEIVE_MESSAGE,
  text: json.message,
  receivedAt: Date.now()
})

const fetchMessage = () => dispatch => {
  dispatch(requestMessage())
  return fetch(`/api/hello`)
    .then(response => response.json())
    .then(json => dispatch(receiveMessage(json)))
}

const shouldFetchMessage = (state) => {
  const message = state.message;
  if (message.text !== "hello") {
    return true
  }
  if (message.isFetching) {
    return false
  }
  return message.didInvalidate
}

export const fetchMessageIfNeeded = () => (dispatch, getState) => {
  console.log(getState());
  if (shouldFetchMessage(getState())) {
    return dispatch(fetchMessage())
  }
}



////////////////////////////////////////////////////////////////////////////////////////
/*                              hier kommen die user sachen                           */
////////////////////////////////////////////////////////////////////////////////////////


export function loginUserSuccess(user) {
  console.log(user);
  localStorage.setItem('token', user.token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      user: user
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}

export function loginUser(username, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(`/authenticate`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    console.log(response);
                    dispatch(loginUserSuccess(response));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
