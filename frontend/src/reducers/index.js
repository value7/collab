import { combineReducers } from 'redux'
import { INVALIDATE_MESSAGE,
  REQUEST_MESSAGE, RECEIVE_MESSAGE
} from '../actions'

const message = (state = {
  isFetching: false,
  didInvalidate: false,
  text: ""
}, action) => {
  switch (action.type) {
    case INVALIDATE_MESSAGE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MESSAGE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        text: action.text,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  message
})

export default rootReducer
