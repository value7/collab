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


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : '';

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
  const request = axios.post(`/authenticate`, formValues);
  console.log(request);
  return {
    type: SIGNIN_USER,
    payload: request
  };
}

export function signInUserSuccess(user) {
  console.log(user);
  cookie.save('token', user.token, { path: '/', maxAge: 86400 });
  cookie.save('user', user, { path: '/', maxAge: 86400 });
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

export const getUserWithToken = (user) => (dispatch) => {
  console.log(user);
  if(user && user.user) {
    var status = 'fromCookie';
    var username = user.user;
    var isAdmin = user.isAdmin || false;
    const request = axios.get(`${ROOT_URL}/api/getUserDetails`)
    .then((result) => {
      console.log(result);
      user.votes = result.data.votes || [];
      console.log(user.votes);
      dispatch(signInUserSuccess(user));
    });
  } else {
    dispatch(signInUserFailure({error: 'couldnt load details'}));
  }
}
