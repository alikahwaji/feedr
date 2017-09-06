import {RECEIVE_ORGANISATION} from '../actions/organisations'

export default function organisation (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ORGANISATION:
      return action.organisation
    default:
      return state
  }
}
