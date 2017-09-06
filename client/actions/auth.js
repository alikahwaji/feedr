import auth from '../helpers/auth'
import { receiveOrganisation } from './organisations'
import api from '../helpers/api'
import {showError} from './index'
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_ERROR = 'LOCK_ERROR'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export function login (route) {
  return dispatch => {
    const options = {
      auth: {
        params: {
          state: route
        }
      }
    }
    auth.login(options)
    dispatch(showLock())
  }
}

export function logout () {
  return dispatch => {
    auth.logout()
    dispatch(userLogout())
  }
}

function userLogout () {
  return {
    type: USER_LOGOUT
  }
}

export function showLock () {
  return {
    type: SHOW_LOCK
  }
}

export function lockError (error) {
  return {
    type: LOCK_ERROR,
    error: error
  }
}

export function lockSuccess (profile, id, token) {
  return {
    type: LOCK_SUCCESS,
    profile: profile,
    token: token,
    id: id.body.id
  }
}

export function updateProfile (profile) {
  return {
    type: UPDATE_PROFILE,
    profile: profile
  }
}

export function resumeAuth (hash, history) {
  return dispatch => {
    auth.lock.resumeAuth(hash, function (error, authResult) {
      if (error) {
        return dispatch(lockError(error))
      }
      history.push(authResult.state)
    })
  }
}

export function doAuthentication () {
  return dispatch => {
    auth.authListener(function (error, token, profile) {
      if (error) {
        // handle error
        return dispatch(lockError(error))
      }
      api({type: 'post', route: '/api/v1/authenticate', data: profile},
        (err, res) => {
          if (err) {
            return dispatch(lockError(err))
          }
          auth.setId(res.body.id)
          return dispatch(lockSuccess(profile, res, token))
        })
    })
  }
}
export function updateAuthProfile (profileData) {
  return dispatch => {
    auth.updateProfile(profileData, (err, res) => {
      if (err) {
        dispatch(showError(err.message))
      } else {
        api({type: 'put', route: '/api/v1/organisation', data: res.user_metadata},
          (error, result) => {
            if (error) {
              dispatch(showError(error.message))
            } else {
              dispatch(receiveOrganisation(result.body))
              return dispatch(updateProfile(res))
            }
          })
      }
    })
  }
}
