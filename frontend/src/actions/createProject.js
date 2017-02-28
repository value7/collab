import axios from 'axios';

//create Projects
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';


//Note when running locally, the node server running on localhost:3000 and the dev-server is running on 8080
//When running on Heroku, we run both on the same port and so just /api is enough.
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function createProject(formValues) {
  const request = axios.post(`${ROOT_URL}/createProject`, formValues);
  console.log(request);
  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export function createProjectSuccess(project) {

  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project
  };
}

export function createProjectFailure(error) {
  return {
    type: CREATE_PROJECT_FAILURE,
    payload: error
  };
}
