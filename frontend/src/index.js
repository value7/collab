import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

import Projects from './components/Projects';
import Header from './containers/Header';
import About from './components/About';

//router stuff
import { Router, Route, browserHistory } from 'react-router';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Header}>
        <Route path="/App" component={App} />
        <Route path="/Projects" component={Projects} />
        <Route path="/About" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
