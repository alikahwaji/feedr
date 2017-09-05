import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IndividualListItem from './IndividualListItem'

import {fetchListings} from '../actions'

class AllListings extends React.Component {
  componentDidMount () {
    this.props.fetchListings()
  }

  render () {
    return (
      <div className="allListingsContainer">
        <div className="Listings-title">
          <h1>Listings</h1>
        </div>
        {(this.props.userOrganisationType === 'business') &&
            <div className="button">
              <Link to='/new'>
                <button className="addNewListing" >Add a New Listing</button>
              </Link>
            </div>}
        <div className="indListContainer">
          {this.props.listings.map((listItem) => {
            return (
              <IndividualListItem key={listItem.id} listitem={listItem}/>
            )
          })}
        </div>
      </div>
    )
  }
}

AllListings.propTypes = {
  listings: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  return {
    listings: state.listings,
    userOrganisationType: state.auth.profile.user_metadata.type,
    userID: state.auth.id
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchListings: () => {
      dispatch(fetchListings())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllListings)
