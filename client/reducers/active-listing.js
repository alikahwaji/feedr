import { RECEIVE_LISTING_DETAILS } from '../actions/listings'

function activeListing (state = {claimed: false}, action) {
  switch (action.type) {
    case RECEIVE_LISTING_DETAILS:
      return {
        ...state,
        ...action.activeListing
      }
    default:
      return state
  }
}

export default activeListing
