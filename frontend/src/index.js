import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import cookie from 'react-cookie';
//import io from 'socket.io-client';

import Header from './containers/Header';
import About from './components/About';
import Admin from './components/Admin';
import Projects from './containers/Projects';

import Tabs from './components/Tabs';

import SignIn from './containers/SignInFormContainer';
import SignUp from './containers/SignUpFormContainer';

import ProjectDetails from './containers/ProjectDetails';
import ProjectTasks from './containers/ProjectTasks';
import TaskDetails from './containers/TaskDetails';
import AddTask from './containers/AddTaskContainer';
import EditDeleteProject from './containers/EditDeleteProjectContainer';

import CreateProject from './containers/CreateProjectContainer';
//router stuff
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import { getUserWithToken } from './actions/user';

import './styles/styles.min.css';
import './styles/index.css';

import { UserIsAuthenticated, UserIsAdmin } from './utils/authWrapper'
import promise from 'redux-promise';
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
middleware.push(promise);
middleware.push(routerMiddleware(browserHistory));

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

// const socket = io('http://127.0.0.1:3001');
// socket.on('message', (payload) => console.log(payload));

function onAppInit(dispatch) {
  return (nextState, replace, next) => {
    if(cookie.load('user')) {
      dispatch(getUserWithToken(cookie.load('user')));
      console.log('logged in from cookie');
      next();
    } else {
      console.log('no cookie no logged in');
      next();
    }
  };
}

const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Header} onEnter={onAppInit(store.dispatch)}>
        <IndexRoute component={About} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="createProject" component={UserIsAuthenticated(CreateProject)} />
        <Route path="projects" component={Projects} />
        <Route path="projects/:projectId" component={Tabs}>
          <IndexRedirect to="overview" />
          <Route path="tasks" component={ProjectTasks} />
          <Route path="tasks/:taskId" component={TaskDetails} />
          <Route path="overview" component={ProjectDetails} />
          <Route path="addTask" component={AddTask} />
          <Route path="editdeleteProject" component={EditDeleteProject} />
        </Route>
        <Route path="/admin" component={UserIsAuthenticated(UserIsAdmin(Admin))}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
