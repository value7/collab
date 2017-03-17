import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { routerReducer } from 'react-router-redux';

import user from './user';
import validateUserFields from './validateUserFields';
import createProject from './createProject';
import addTasks from './addTasks';
import projects from './projects';
import chats from './chats';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  user,
  projects,
  chats,
  createProject,
  addTasks,
  validateUserFields,
  routing: routerReducer
})

export default rootReducer
