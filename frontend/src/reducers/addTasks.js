import {
	ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_FAILURE
} from '../actions/addTasks';

const INITIAL_STATE = {error: null, loading: false, state: null};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case ADD_TASK://sign up or sign in form fields
    return { ...state, error:null, loading: true, state: 'creating'};
    case ADD_TASK_SUCCESS:// same as RESET_USER_FIELDS
    return { ...state, error:null, loading: false, state: 'succeeded'};
    case ADD_TASK_FAILURE:
    error = action.payload.data ? action.payload.data : {message: action.payload.message}
    return { ...state, error:error, loading: false, state: 'failed'};
    default:
    return state;
  }
}
