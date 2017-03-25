import axios from 'axios';

//create Projects
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';


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
