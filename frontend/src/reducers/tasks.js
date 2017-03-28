import { ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, TAKE_TASK_SUCCESS, MOVE_TASK_STATE_SUCCESS } from '../actions/tasks';
import { GET_PROJECT, GET_DETAILS } from '../actions/projects';

const INITIAL_STATE = {error: null, loading: false, state: null, tasks: {}};

function getTasks(state, action) {
  var result = Object.assign({}, state.tasks, action.payload.tasks);
	console.log(result);
	return result;
}

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case ADD_TASK://sign up or sign in form fields
    	return {
				...state,
				error:null,
				loading: true,
				state: 'creating'
			};
		case ADD_TASK_SUCCESS:
			console.log(action);
			console.log(state);
			return {
				...state,
				tasks: {
					...state.tasks,
					[action.payload.id]: action.payload
				}
			};
		case ADD_TASK_FAILURE:
			error = action.payload.data ? action.payload.data : {message: action.payload.message}
			return {
				...state,
				error:error,
				loading: false,
				state: 'failed'
			};
		case GET_PROJECT:
		  console.log(action.payload);
			return {
				...state,
				tasks: getTasks(state, action)
			};
		case GET_DETAILS:
			console.log(action.payload);
			return {
				...state,
				tasks: getTasks(state, action)
			};
		case TAKE_TASK_SUCCESS:
			console.log('asdfsadfasdfsdaf');
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            taskowners: state.tasks[action.taskId].taskowners.concat(action.user)
          }
        }
      }
    case MOVE_TASK_STATE_SUCCESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            statename: action.statename
          }
        }
      }
    default:
    return state;
  }
}
