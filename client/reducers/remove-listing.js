import {REMOVE_LISTING} from '../actions/listings'

export default function removeListing (state = [], action) {
  switch (action.type) {
    case REMOVE_LISTING:
      return state.listings
    default:
      return state
  }
}
