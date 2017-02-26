import {
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
	SIGNIN_USER, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,	LOGOUT_USER
} from '../actions/user';
import cookie from 'react-cookie';

//user = userobj,
// status can be:
// 1. 'storage' ie. localstorage / sessionstorage)
// 2. 'signup' (signing up)
// 3. 'signin' (signing in)
// 4. 'validate'(validate fields)
// 5. 'validate_email' (validating email token)
// 5. 'authenticated'(after signin)
// 6. 'logout' (after logout)
var user = cookie.load('user');
console.log(user);
var status = null;
var username = null;
var error = null;
var loading = false;
var isAdmin = false;
if(user) {
  status = 'fromCookie';
  username = user.user;
  isAdmin = user.isAdmin;
}
const INITIAL_STATE = {user: username, status: status, error: error, loading: loading, isAdmin: isAdmin};

export default function(state = INITIAL_STATE, action) {
  let error;
  console.log(action);
  switch(action.type) {

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, user: null, status:'signup', error:null, loading: true, isAdmin: false};
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false, isAdmin: action.payload.isAdmin}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'signup', error:error, loading: false, isAdmin: false};


    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', error:null, loading: true, isAdmin: false};
    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false, isAdmin: action.payload.isAdmin}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'signin', error:error, loading: false, isAdmin: false};

    //TODO delete all user data
    case LOGOUT_USER:
      return {...state, user: null, status:'logout', error:null, loading: false, isAdmin: false};

    case RESET_USER:// reset authenticated user to initial state
    return { ...state, user: null, status:null, error:null, loading: false, isAdmin: false};

    default:
    return state;
  }
}
