import axios from 'axios';
import cookie from 'react-cookie';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : '/api';

export function signUpUser(formValues) {
  console.log(formValues);
  const request = axios.post(`${ROOT_URL}/users/signup`, formValues);

  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}


export function resetUser() {
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });
  return {
    type: RESET_USER,
  };
}

export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/authenticate`, formValues);
  console.log(request);
  return {
    type: SIGNIN_USER,
    payload: request
  };
}

export function signInUserSuccess(user) {
  console.log(user);
  cookie.save('token', user.token, { path: '/' });
  cookie.save('user', user, { path: '/' });
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function logoutUser() {
  console.log('asdfasdfasdfsdaf');
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });
  return {
    type: LOGOUT_USER
  };
}
