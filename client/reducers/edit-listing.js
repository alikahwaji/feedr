import {UPDATE_LISTING} from '../actions/listings'

export default function updateListing (state = {}, action) {
  switch (action.type) {
    case UPDATE_LISTING:
      return {listing: [
        {
          categoryId: action.categoryId,
          description: action.description,
          itemExpiry: action.itemExpiry
        }
      ]}
    default:
      return state
  }
}
