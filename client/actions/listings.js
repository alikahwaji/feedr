import {showError} from './index'
import api from '../helpers/api'
import request from 'superagent'
export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'
export const ADD_LISTING = 'ADD_LISTING'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'
export const REQUEST_LISTING_DETAILS = 'REQUEST_LISTING_DETAILS'
export const RECEIVE_LISTING_DETAILS = 'RECEIVE_LISTING_DETAILS'
export const REMOVE_LISTING = 'REMOVE_LISTING'
export const UPDATE_LISTING = 'EDIT_LISTING'

export function requestListings () {
  return {
    type: REQUEST_LISTINGS
  }
}

export function removeListing (id) {
  return {
    type: REMOVE_LISTING,
    id: id
  }
}
export function addNewListing (listing) {
  return {
    type: ADD_LISTING,
    listing: listing
  }
}

export function receiveListings (listings) {
  return {
    type: RECEIVE_LISTINGS,
    listings: listings
  }
}

export function requestListingDetails () {
  return {
    type: REQUEST_LISTING_DETAILS
  }
}

export function receiveListingDetails (activeListing) {
  activeListing.claimed = !!activeListing.recipientId
  return {
    type: RECEIVE_LISTING_DETAILS,
    activeListing: activeListing
  }
}

export function editListing (listing) {
  return {
    type: UPDATE_LISTING,
    listing: listing
  }
}

export function fetchListings () {
  return (dispatch) => {
    dispatch(requestListings())
    api({route: '/api/v1/listings'},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(receiveListings(res.body))
        }
      })
  }
}

export function addListing (listing) {
  return (dispatch) => {
    console.log(listing)
    api({type: 'post', route: '/api/v1/listings', data: listing},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(addNewListing(res.body))
        }
      })
  }
}

export function fetchListingDetails (id) {
  return (dispatch) => {
    dispatch(requestListingDetails())
    api({route: `/api/v1/listings/${id}`},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(receiveListingDetails(res.body))
        }
      })
  }
}

export function updateListing (listing) {
  return (dispatch) => {
    dispatch(requestListings())
    api({type: 'put', route: `/api/v1/listings/${listing.id}`, data: listing},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(editListing(res.body))
          dispatch(fetchListings())
          dispatch(fetchListingDetails(listing.id))
        }
      })
  }
}

export function deleteListing (id) {
  return (dispatch) => {
    dispatch(requestListings())
    request
      .delete(`/api/v1/listings/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(removeListing(id))
          dispatch(fetchListings())
        }
      })
  }
}
