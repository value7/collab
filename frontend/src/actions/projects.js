import axios from 'axios';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';

export const UPVOTE_PROJECT = 'UPVOTE_PROJECT';
export const UPVOTE_PROJECT_SUCCESS = 'UPVOTE_PROJECT_SUCCESS';
export const UPVOTE_PROJECT_FAILURE = 'UPVOTE_PROJECT_FAILURE';

export const CANCEL_UPVOTE_PROJECT = 'CANCEL_UPVOTE_PROJECT';

export const GET_DETAILS = 'GET_DETAILS';

export const GET_PROJECT = 'GET_PROJECT';

export const INCREMENT_STATE = 'INCREMENT_STATE';

export const ADD_TASK = 'ADD_TASK';
export const TAKE_TASK = 'TAKE_TASK';
export const TAKE_TASK_SUCCESS = 'TAKE_TASK_SUCCESS';
export const TAKE_TASK_FAILURE = 'TAKE_TASK_FAILURE';

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
  if (projects.projects.length === 0 || !projects.lastUpdated) {
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

const shouldFetchProject = (state, projectId) => {
  const project = state.projects;
  console.log(state.projects);
  console.log(project);
  if(project.projects[projectId]) {
    console.log('AaAAAAAAAAAaAaAa');
    console.log('i want to get only details or nothing');
    return false;
  } else {
    console.log('i want to get everything');
    return true;
  }
}

const shouldFetchProjectAll = (state, projectId) => {
  const projects = state.projects;
  //TODO check if details are here (currently users is details)
  console.log(state.projects);
  console.log(projects.projects[projectId].user);
  if(projects.projects && projects.projects.user) {
    console.log('i want to get only details or nothing');
    return false;
  } else {
    console.log('i want to get everything');
    return true;
  }
}

function getProject(project, projectId) {
  return {
    type: GET_PROJECT,
    project: project,
    projectId: projectId
  }
}

export const fetchProjectDetailsOrAllIfNeeded = (projectId) => (dispatch, getState) => {
  console.log(projectId);
  if(shouldFetchProject(getState(), projectId)) {
    //getAll
    console.log('getting everything');
    var postVar = {};
    postVar.projectId = projectId;
    const request = axios.post(`${ROOT_URL}/api/getProject`, postVar)
    .then((result) => {
      console.log(result);
      dispatch(getProject(result.data, projectId));
    });
  } else if(shouldFetchProjectAll(getState(), projectId)) {
    //get only details
    console.log('getting details');
    var postVar = {};
    postVar.projectId = projectId;
    const request = axios.post(`${ROOT_URL}/api/getDetails`, postVar)
    .then((result) => {
      console.log(result);
      dispatch(getDetails(result.data, projectId));
    });
  }
  //do nothing
}

function getDetails(details, projectId) {
  return {
    type: GET_DETAILS,
    details: details,
    projectId: projectId
  }
}
//TODO UPVOTE IS A USER AND A PROJECT ACTION
// => votes müssen raus FUCKFUCKFUCKFUCKFUCKFUCKFUCK
// WIE WANN HOL ICH MIR das
// gehört eigentlich nur zum user ? also ohne user kann ich mir die votes nicht hohlen
// naja ich hol mir votes ja mit den projekten gemeinsam
// will ich alle votes im frontend ham?, also alle???
// WIESO MUSS ICHS IM PROJEKT HAM WHYEHYEHYWHY
// ICH kann doch einfach beim up/down voten die dinger auch beim user rausnehmen
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

export function cancelUpVote(projectId) {
  console.log(projectId);
  var postVar = {};
  postVar.projectId = projectId;
  const request = axios.post(`${ROOT_URL}/projects/downvote`, postVar);

  return {
    type: CANCEL_UPVOTE_PROJECT,
    projectId: projectId
  }
}

export function incrementState(projectId) {
  console.log(projectId);
  var postVar = {};
  postVar.projectId = projectId;
  const request = axios.post(`${ROOT_URL}/projects/incrementState`, postVar);

  return {
    type: INCREMENT_STATE,
    projectId: projectId
  }
}


export const requestTakeTask = (taskId) => dispatch => {
  dispatch(takeTask(taskId));
  var postVar = {};
  postVar.taskId = taskId;
  const request = axios.post(`${ROOT_URL}/projects/takeTask`, postVar)
  .then((result) => {
      console.log(result);
      if(result.data && result.data.taskId && result.data.user) {
        dispatch(takeTaskSuccess(result.data));
      } else {
        dispatch(takeTaskFailure(result.statusText));
      }
  })
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
