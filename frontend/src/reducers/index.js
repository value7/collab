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

import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../actions';

const user = (state = { ...cookie.load('user') || null
  // token: null,
  // userName: null,
  // isAuthenticated: false,   //TODO hier schaun ob ma die Daten aus dem cookie bekommt
  // isAuthenticating: false,
  // statusText: null
}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
          'isAuthenticating': true,
          'statusText': null
      })
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': true,
          'token': action.payload.user.token,
          'username': action.payload.user.username,
          'statusText': 'You have been successfully logged in.'
      })
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
          'isAuthenticating': false,
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      })
    case LOGOUT_USER:
      return Object.assign({}, state, {
          'isAuthenticated': false,
          'token': null,
          'username': null,
          'statusText': 'You have been successfully logged out.'
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  message,
  form: reduxFormReducer,
  user,
  securedMessage,
  routing: routerReducer
})

export default rootReducer
