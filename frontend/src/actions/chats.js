import axios from 'axios';

export const REQUEST_CHAT = 'REQUEST_CHAT';
export const RECEIVE_CHAT = 'RECEIVE_CHAT';
export const INVALIDATE_CHAT = 'INVALIDATE_CHAT';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000' : '';

export const requestChat = (projectId, taskId) => ({
  type: REQUEST_CHAT,
  projectId: projectId,
  taskId: taskId
})

export const receiveChat = (json, projectId, taskId) => ({
  type: RECEIVE_CHAT,
  chat: json,
  receivedAt: Date.now(),
  projectId,
  taskId
})

const shouldFetchChat = (projectId, taskId, state) => {
  const chat = state.chat;
  if (!chat || !chat[projectId] || !chat[projectId][taskId] || !(chat[projectId][taskId].lastUpdated > new Date(0))) {
    return true
  }
  if (chat.isFetching) {
    return false
  }
  return chat.didInvalidate
}


const fetchChat = (projectId, taskId) => dispatch => {
  dispatch(requestChat(projectId, taskId));
  if(taskId === 'overview') {
    taskId = 0;
  }
  var postVar = {};
  postVar.projectId = projectId;
  postVar.taskId = taskId;
  axios.post(`${ROOT_URL}/api/getChat`, postVar)
  .then((result) => {
      console.log(result);
      dispatch(receiveChat(result.data, projectId, taskId));
  })
}

export const fetchChatIfNeeded = (projectId, taskId) => (dispatch, getState) => {
  console.log(getState());
  if (shouldFetchChat(projectId, taskId, getState())) {
    return dispatch(fetchChat(projectId, taskId))
  }
}

export function addMessage(formValues) {
  console.log(formValues);
  const request = axios.post(`${ROOT_URL}/api/addMessage`, formValues);
  console.log(request);
  return {
    type: ADD_MESSAGE,
    payload: request
  };
}

export function addMessageSuccess(message, projectId, taskId) {

  return {
    type: ADD_MESSAGE_SUCCESS,
    payload: message
  };
}

export function addMessageFailure(error, projectId, taskId) {
  return {
    type: ADD_MESSAGE_FAILURE,
    payload: error
  };
}
