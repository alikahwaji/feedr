import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function ListItem (props) {
  return (
    <div className ='IndividualListItem'>
      <p>Provider: {props.listitem.providerName}</p>
      <p>{props.listitem.providerAddress}</p>
      <p> Description: {props.listitem.description}</p>
      <p> Use By Date: {props.listitem.pickupTime}</p>
      <p> Available from: {props.listitem.itemExpiry} </p>
      <button className="viewListing">
        <Link to={`/listings/${props.listitem.id}`}>VIEW LISTING</Link></button>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    userOrganisationType: state.auth.profile.user_metadata.type
  }
}

export default connect(mapStateToProps)(ListItem)
