import { REQUEST_CHAT, RECEIVE_CHAT, INVALIDATE_CHAT,
ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE }
from '../actions/chats';


function insertChat(array, action) {
  let newArray = array.slice();
  console.log(action);
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

function addMessageSuccess(array, action) {
  console.log(action);
  var chats = array.filter(function(chat) {
    console.log('checking');
    if(parseInt(chat.taskId, 10) === action.payload.taskid && parseInt(chat.projectId, 10) === action.payload.projectid) {
      console.log('found');
      chat.messages.push(action.payload);
    }
    return chat;
  });
  return chats;
}

function addMessageError(array, action) {
  var chats = array.filter(function(chat) {
    if(chat.taskId === action.taskId && chat.projectId === action.projectId) {
      chat.didInvalidate = true;
    }
    return chat;
  });
  return chats;
}

export default function(state = [], action) {
  switch(action.type) {
    case INVALIDATE_CHAT:
      return [...state];  //TODO
    case REQUEST_CHAT:
      return [...state];
    case RECEIVE_CHAT:
      return insertChat(state, action);
    // case ADD_MESSAGE:
    //   return addMessage(state, action);
    case ADD_MESSAGE_SUCCESS:
      return addMessageSuccess(state, action);
    case ADD_MESSAGE_FAILURE:
      return addMessageError(state, action);
    default:
      return state;
  }
}
