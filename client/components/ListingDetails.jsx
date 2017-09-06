import React from 'react'
import { connect } from 'react-redux'

import { fetchListingDetails, updateListing, deleteListing } from '../actions/listings'
import { Link, Redirect } from 'react-router-dom'

class ListingDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deleted: false
    }
    this.handleClaim = this.handleClaim.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleUnclaim = this.handleUnclaim.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchListingDetails(this.props.match.params.id))
  }

  handleClaim (event) {
    const listing = {
      id: this.props.details.id,
      provider: this.props.details.providerName,
      description: this.props.details.description,
      date: this.props.details.itemExpiry,
      recipientId: this.props.userID
    }
    this.props.dispatch(updateListing(listing))
    event.preventDefault()
  }

  handleUnclaim (event) {
    const listing = {
      id: this.props.details.id,
      provider: this.props.details.providerName,
      description: this.props.details.description,
      date: this.props.details.itemExpiry,
      recipientId: null
    }
    this.props.dispatch(updateListing(listing))
    event.preventDefault()
  }

  handleOnClick () {
    this.props.dispatch(deleteListing(this.props.details.id))
    this.setState({deleted: true})
  }

  render () {
    const canEditOrRemove = this.props.userID === this.props.details.providerID || this.props.userID === 11
    const youClaimed = this.props.userID === this.props.details.recipientId
    const isCharity = this.props.userOrganisationType === 'charity'

    if (this.state.deleted) {
      return <Redirect to="/listings" />
    } else {
      return (
        <div className='listing-details-container'>
          <h1>Listing Details</h1>
          <div className="listing-details">
            <p>Provider: {this.props.details.providerName}</p>
            {(this.props.loggedIn) &&
            <p>Provider Address: {this.props.details.providerAddress}</p>}
            <p>Description: {this.props.details.description}</p>
            <p>Use By Date: {this.props.details.itemExpiry}</p>
            <p>Available from: {this.props.details.pickupTime}</p>
            <p>{this.props.details.claimed ? 'Claimed' : 'Unclaimed'}</p>
            { youClaimed && isCharity &&
              <button className="unclaimButton" onClick={this.handleUnclaim}>UNCLAIM</button> }
            { !youClaimed && isCharity &&
              <button className="claimButton" onClick={this.handleClaim}>CLAIM</button>
            }
            {canEditOrRemove &&
              <Link to={`/listings/${this.props.details.id}/edit`}>
                <button className="editListing">EDIT</button>
              </Link>
            }
            {canEditOrRemove &&
              <button className="removeListing" onClick={this.handleOnClick}>Remove</button>
            }
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.activeListing,
    listings: state.listings,
    userOrganisationType: state.auth.profile.user_metadata.type,
    userID: state.auth.id,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(ListingDetails)
