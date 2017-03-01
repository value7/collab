import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

import Header from './containers/Header';
import About from './components/About';
import ApiTest from './containers/ApiTest';
import SecuredApiTest from './containers/SecuredApiTest';
import Foo from './components/Foo';
import Admin from './components/Admin';
import Projects from './containers/Projects';

import SignIn from './containers/SignInFormContainer';
import SignUp from './containers/SignUpFormContainer';

import CreateProject from './containers/CreateProjectContainer';
//router stuff
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

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
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Header}>
        <Route path="/About" component={About} />
        <Route path="/ApiTest" component={ApiTest} />
        <Route path="/securedApi" component={SecuredApiTest} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/createProject" component={CreateProject} />
        <Route path="/projects" component={Projects} />
        <Route path="/foo" component={UserIsAuthenticated(Foo)}/>
        <Route path="/admin" component={UserIsAuthenticated(UserIsAdmin(Admin))}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
