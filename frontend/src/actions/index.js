export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const INVALIDATE_MESSAGE = 'INVALIDATE_MESSAGE';

export const invalidateMessage = () => ({
  type: INVALIDATE_MESSAGE
})

export const requestMessage = () => ({
  type: REQUEST_MESSAGE
})

export const receiveMessage = (json) => ({
  type: RECEIVE_MESSAGE,
  text: json.message,
  receivedAt: Date.now()
})

const fetchMessage = () => dispatch => {
  dispatch(requestMessage())
  return fetch(`/api/hello`)
    .then(response => response.json())
    .then(json => dispatch(receiveMessage(json)))
}

const shouldFetchMessage = (state) => {
  const message = state.message;
  if (message.text !== "hello") {
    return true
  }
  if (message.isFetching) {
    return false
  }
  return message.didInvalidate
}

export const fetchMessageIfNeeded = () => (dispatch, getState) => {
  console.log(getState());
  if (shouldFetchMessage(getState())) {
    return dispatch(fetchMessage())
  }
}
