import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'
import AuthService from './utils/AuthService'

import Container from './Container'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Demo from './components/Demo'
import ShowPrompter from './components/ShowPrompter'
import Home from './components/Home'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Container} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='login' component={Login} />
      <Route path='demo' component={Demo} />
      <Route path='prompter' component={ShowPrompter} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routes
