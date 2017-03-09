import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { routerReducer } from 'react-router-redux';

import user from './user';
import validateUserFields from './validateUserFields';
import createProject from './createProject';
import projects from './projects';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  user,
  projects,
  createProject,
  validateUserFields,
  routing: routerReducer
})

export default rootReducer
