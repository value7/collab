import {
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
	SIGNIN_USER, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,	LOGOUT_USER,
	ADD_USER_UPVOTED
} from '../actions/user';
import { UPVOTE_PROJECT, CANCEL_UPVOTE_PROJECT } from '../actions/projects';

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
// var user = cookie.load('user');
// console.log(user);
var status = null;
var username = null;
var error = null;
var loading = false;
var isAdmin = false;
var votes = [];
// if(user) {
//   status = 'fromCookie';
//   username = user.user;
//   isAdmin = user.isAdmin;
// 	votes = user.votes;
// }
const INITIAL_STATE = {user: username, status: status, error: error, loading: loading, isAdmin: isAdmin, votes: votes};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, user: null, status:'signup', error:null, loading: true, isAdmin: false};
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.user, votes: action.payload.votes, status:'authenticated', error:null, loading: false, isAdmin: action.payload.isAdmin}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'signup', error:error, loading: false, isAdmin: false};


    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', error:null, loading: true, isAdmin: false};
    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.user, votes: action.payload.votes, status:'authenticated', error:null, loading: false, isAdmin: action.payload.isAdmin}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'signin', error:error, loading: false, isAdmin: false};

    //TODO delete all user data
    case LOGOUT_USER:
      return {...state, user: null, status:'logout', error:null, loading: false, isAdmin: false, votes: []};

    case RESET_USER:// reset authenticated user to initial state
    return { ...state, user: null, status:null, error:null, loading: false, isAdmin: false};

		case UPVOTE_PROJECT:
		//TODO update the maxAge of the cookie (needs to be the same as the jwt)
		//could just get it from the cookie but thats to expensive
		// i shouldnt store that information in the cookie
		// getting the state from the user has to be a bit more complex :()
			// cookie.remove('user', { path: '/' });
			// cookie.save('user', { ...state, votes: state.votes.concat(action.projectId)}, { path: '/' });
			return { ...state, votes: state.votes.concat(action.projectId)}
		case CANCEL_UPVOTE_PROJECT:
			// cookie.remove('user', { path: '/' });
			// cookie.save('user', { ...state, votes: state.votes.filter(vote => action.projectId !== vote)}, { path: '/' });
			return { ...state, votes: state.votes.filter(vote => action.projectId !== vote)}

    default:
    return state;
  }
}
