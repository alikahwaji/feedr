import {RECEIVE_LISTINGS} from '../actions'

export default function listings (state = [], action) {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return action.listings
    default:
      return state
  }
}
