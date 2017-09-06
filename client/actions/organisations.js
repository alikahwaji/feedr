import {showError} from './index'
import api from '../helpers/api'
export const ADD_ORGANISATION = 'ADD_ORGANISATION'
export const REQUEST_ORGANISATION = 'REQUEST_ORGANISATION'
export const RECEIVE_ORGANISATION = 'RECEIVE_ORGANISATION'

export function requestOrganisation () {
  return {
    type: REQUEST_ORGANISATION
  }
}

export function addNewOrganisation (organisation) {
  return {
    type: ADD_ORGANISATION,
    organisation: organisation
  }
}
export function receiveOrganisation (organisation) {
  return {
    type: RECEIVE_ORGANISATION,
    organisation: organisation
  }
}
/**
  * gets all organisations
  */
export function fetchOrganisations () {
  return (dispatch) => {
    api({type: 'get', route: '/api/v1/profiles'},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          // dispatch(receiveOrganisations(res.body))
        }
      })
  }
}

/**
  * fetches the organisation details for the currently logged in user
  */
export function fetchOrganisation () {
  return (dispatch) => {
    api({type: 'get', route: '/api/v1/organisation'},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(receiveOrganisation(res.body))
        }
      })
  }
}
export function fetchOrganisationById (id) {
  return (dispatch) => {
    api({type: 'get', route: `/api/v1/profile/${id}`},
      (err, res) => {
        if (err) {
          dispatch(showError(err.message))
        } else {
          dispatch(receiveOrganisation(res.body))
        }
      })
  }
}
