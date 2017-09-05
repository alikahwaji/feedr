import { UPDATE_PROFILE, LOCK_ERROR, LOCK_SUCCESS, USER_LOGOUT } from '../actions/auth'
import auth from '../helpers/auth'

const initialState = {
  loggedIn: auth.isLoggedIn(),
  profile: auth.profile || {
    user_metadata: {}
  },
  token: auth.token,
  id: auth.id,
  error: null
}

export default function organisations (state = initialState, action) {
  switch (action.type) {
    case LOCK_ERROR:
      return {
        ...state,
        error: action.error
      }
    case LOCK_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        profile: action.profile,
        token: action.token,
        id: action.id
      }
    case USER_LOGOUT:
      return {
        ...state,
        profile: null,
        token: null,
        loggedIn: false
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}
