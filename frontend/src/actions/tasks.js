import axios from 'axios';

//create Projects
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const TAKE_TASK = 'TAKE_TASK';
export const TAKE_TASK_SUCCESS = 'TAKE_TASK_SUCCESS';
export const TAKE_TASK_FAILURE = 'TAKE_TASK_FAILURE';

export const MOVE_TASK_STATE = 'MOVE_TASK_STATE';
export const MOVE_TASK_STATE_SUCCESS = 'MOVE_TASK_STATE_SUCCESS';
export const MOVE_TASK_STATE_FAILURE = 'MOVE_TASK_STATE_FAILURE';
//Note when running locally, the node server running on localhost:3000 and the dev-server is running on 8080
//When running on Heroku, we run both on the same port and so just /api is enough.
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function addTask(formValues) {
  const request = axios.post(`${ROOT_URL}/projects/addTask`, formValues);
  console.log(request);
  return {
    type: ADD_TASK,
    payload: request
  };
}

export function addTaskSuccess(task) {

  return {
    type: ADD_TASK_SUCCESS,
    payload: task
  };
}

export function addTaskFailure(error) {
  return {
    type: ADD_TASK_FAILURE,
    payload: error
  };
}


export const takeTask = (taskId) => ({
  type: TAKE_TASK,
  taskId: taskId
})

export const takeTaskSuccess = (json) => ({
  type: TAKE_TASK_SUCCESS,
  taskId: json.taskId,
  user: json.user
})

export const takeTaskFailure = (error) => ({
  type: TAKE_TASK_FAILURE,
  error: error
});


export const requestTakeTask = (taskId) => dispatch => {
  dispatch(takeTask(taskId));
  var postVar = {};
  postVar.taskId = taskId;
  axios.post(`${ROOT_URL}/projects/takeTask`, postVar)
  .then((result) => {
      console.log(result);
      if(result.data && result.data.taskId && result.data.user) {
        dispatch(takeTaskSuccess(result.data));
      } else {
        dispatch(takeTaskFailure(result.statusText));
      }
  })
}


export const moveTaskState = (taskId) => ({
  type: MOVE_TASK_STATE,
  taskId: taskId
})

export const moveTaskStateSuccess = (json) => ({
  type: MOVE_TASK_STATE_SUCCESS,
  taskId: json.taskId,
  statename: json.statename
})

export const moveTaskStateFailure = (error) => ({
  type: MOVE_TASK_STATE_FAILURE,
  error: error
});


export const requestMoveTaskState = (taskId) => dispatch => {
  dispatch(moveTaskState(taskId));
  var postVar = {};
  postVar.taskId = taskId;
  axios.post(`${ROOT_URL}/projects/moveTaskState`, postVar)
  .then((result) => {
      console.log(result);
      if(result.data && result.data.taskId && result.data.statename) {
        dispatch(moveTaskStateSuccess(result.data));
      } else {
        dispatch(moveTaskStateFailure(result.statusText));
      }
  })
}
