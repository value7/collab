import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { INVALIDATE_MESSAGE,
  REQUEST_MESSAGE, RECEIVE_MESSAGE,
  INVALIDATE_SECURED_MESSAGE,
  REQUEST_SECURED_MESSAGE, RECEIVE_SECURED_MESSAGE
} from '../actions'

import { routerReducer } from 'react-router-redux';
import cookie from 'react-cookie';

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

const securedMessage = (state = {
  isFetching: false,
  didInvalidate: false,
  text: ""
}, action) => {
  switch (action.type) {
    case INVALIDATE_SECURED_MESSAGE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_SECURED_MESSAGE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_SECURED_MESSAGE:
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

import user from './user';
import validateUserFields from './validateUserFields';

const rootReducer = combineReducers({
  message,
  form: reduxFormReducer,
  user,
  validateUserFields,
  securedMessage,
  routing: routerReducer
})

export default rootReducer
