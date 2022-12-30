import { EventEmitter } from 'events'
// import { isTokenExpired } from './jwtHelper'
import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}/login`,
        responseType: 'token',
        params: {
          state: JSON.stringify({pathname: window.location.pathname})
        }
      }
    })
    // Add callback for lock 'authenticated' event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock 'authorization_error' event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login function to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.accessToken)
    // navigate to the home route
    browserHistory.replace('/home')
    // Async loads the user profile data
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
        return
      } else {
        this.setProfile(profile)
      }
      // profile.user_metadata = profile.user_metadata || {}
      // this.storage.set('profile', JSON.stringify(profile))
      // this.user = profile

    })
  }

  _authorizationError(error) {
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    // return !!token && !isTokenExpired(token)
    return !!token
  }

  setProfile(profile) {
    // Save profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Trigger profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrives the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrives the suer token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
