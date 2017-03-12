import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { routerReducer } from 'react-router-redux';

import user from './user';
import validateUserFields from './validateUserFields';
import createProject from './createProject';
import addTasks from './addTasks';
import projects from './projects';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  user,
  projects,
  createProject,
  addTasks,
  validateUserFields,
  routing: routerReducer
})

export default rootReducer
