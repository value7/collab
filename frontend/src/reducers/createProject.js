import {
	CREATE_PROJECT, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE
} from '../actions/createProject';

const INITIAL_STATE = {error: null, loading: false, state: null};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case CREATE_PROJECT://sign up or sign in form fields
    return { ...state, error:null, loading: true, state: 'creating'};
    case CREATE_PROJECT_SUCCESS:// same as RESET_USER_FIELDS
    return { ...state, error:null, loading: false, state: 'succeeded'};
    case CREATE_PROJECT_FAILURE:
    error = action.payload.data ? action.payload.data : {message: action.payload.message}
    return { ...state, error:error, loading: false, state: 'failed'};
    default:
    return state;
  }
}
