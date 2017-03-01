import axios from 'axios';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export const UPVOTE_PROJECT = 'UPVOTE_PROJECT';
export const UPVOTE_PROJECT_SUCCESS = 'UPVOTE_PROJECT_SUCCESS';
export const UPVOTE_PROJECT_FAILURE = 'UPVOTE_PROJECT_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : '';

export const invalidateProjects = () => ({
  type: INVALIDATE_PROJECTS
})

export const requestProjects = () => ({
  type: REQUEST_PROJECTS
})

export const receiveProjects = (json) => ({
  type: RECEIVE_PROJECTS,
  projects: json,
  receivedAt: Date.now()
})

const fetchProjects = () => dispatch => {
  dispatch(requestProjects())
  return fetch(`/api/getAllProjects`)
    .then(response => response.json())
    .then(json => dispatch(receiveProjects(json)))
}

const shouldFetchProjects = (state) => {
  const projects = state.projects;
  if (projects.projects.length === 0) {
    return true
  }
  if (projects.isFetching) {
    return false
  }
  return projects.didInvalidate
}

export const fetchProjectsIfNeeded = () => (dispatch, getState) => {
  console.log(getState());
  if (shouldFetchProjects(getState())) {
    return dispatch(fetchProjects())
  }
}


export function upvoteProject(projectId) {
  console.log(projectId);
  var postVar = {};
  postVar.projectId = projectId;
  const request = axios.post(`${ROOT_URL}/projects/upvote`, postVar);

  return {
    type: UPVOTE_PROJECT,
    projectId: projectId
  };
}

//TODO
// export function upvoteProjectSuccess(projectId) {
//   return {
//     type: UPVOTE_PROJECT_SUCCESS,
//     payload: projectId
//   };
// }
//
// export function upvoteProjectFailure(error) {
//   return {
//     type: UPVOTE_PROJECT_FAILURE,
//     payload: error
//   };
// }
