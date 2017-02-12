import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

import Projects from './components/Projects';
import Header from './containers/Header';
import About from './components/About';
import ApiTest from './containers/ApiTest';
import SecuredApiTest from './containers/SecuredApiTest';
import Foo from './components/Foo';
import Admin from './components/Admin';

import Login from './components/Login';

//router stuff
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import { UserIsAuthenticated, UserIsAdmin } from './utils/authWrapper'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

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
        <Route path="/Projects" component={Projects} />
        <Route path="/About" component={About} />
        <Route path="/ApiTest" component={ApiTest} />
        <Route path="/securedApi" component={SecuredApiTest} />
        <Route path="/login" component={Login} />
        <Route path="/foo" component={UserIsAuthenticated(Foo)}/>
        <Route path="/admin" component={UserIsAuthenticated(UserIsAdmin(Admin))}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
