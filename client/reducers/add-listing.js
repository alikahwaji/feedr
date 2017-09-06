import {ADD_LISTING} from '../actions/listings'

export default function addListing (state = [], action) {
  switch (action.type) {
    case ADD_LISTING:
      return {listing: [
        {
          name: action.name,
          categoryId: action.categoryId,
          description: action.description,
          pickupTime: action.pickupTime,
          itemExpiry: action.itemExpiry
        }
      ]}
    default:
      return state
  }
}
