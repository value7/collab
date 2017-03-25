import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { routerReducer } from 'react-router-redux';

import user from './user';
import validateUserFields from './validateUserFields';
import createProject from './createProject';
import tasks from './tasks';
import projects from './projects';
import chats from './chats';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  user,
  projects,
  chats,
  createProject,
  tasks,
  validateUserFields,
  routing: routerReducer
})

export default rootReducer
