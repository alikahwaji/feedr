import { combineReducers } from 'redux'

import errorMessage from './error-message'
import listings from './listings'
import organisation from './organisation'
import auth from './auth'
import activeListing from './active-listing'
import addListing from './add-listing'
import editListing from './edit-listing'
import forms from './forms'

export default combineReducers({
  errorMessage,
  listings,
  organisation,
  auth,
  activeListing,
  addListing,
  editListing,
  ...forms
})
