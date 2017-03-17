import { REQUEST_CHAT, RECEIVE_CHAT, INVALIDATE_CHAT }
from '../actions/chats';

function insertChat(array, action) {
  let newArray = array.slice();
  newArray.push({
    projectId: action.projectId,
    taskId: action.taskId,
    messages: action.chat,
    isFetching: false,
    didInvalidate: false,
    lastUpdated: action.receivedAt
  });
  return newArray;
}

function updateChat(array, action) {

}

export default function(state = [], action) {
  console.log(action);
  switch(action.type) {
    case INVALIDATE_CHAT:
      return [...state];  //TODO
    case REQUEST_CHAT:
      return [...state];
    case RECEIVE_CHAT:
      return insertChat(state, action)
    default:
      return state;
  }
}
