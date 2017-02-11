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

import Login from './components/Login';

//router stuff
import { Router, Route, browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

middleware.push(routerMiddleware(browserHistory));

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <Route path="/Projects" component={Projects} />
        <Route path="/About" component={About} />
        <Route path="/ApiTest" component={ApiTest} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
