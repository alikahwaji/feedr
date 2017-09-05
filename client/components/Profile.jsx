import React from 'react'

import {connect} from 'react-redux'
import {fetchOrganisationById} from '../actions'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      organisation: props.organisation
    }
  }
  componentDidMount () {
    this.props.fetchOrganisationById(this.props.match.params.id)
  }
  render () {
    return (
      <div className='profile-page'>
        <h1 className='header'>Profile</h1>
        <h4 className='subheader'>My Profile</h4>
        <p>Business Name: {this.props.organisation.name}</p>
        <p>Address: {this.props.organisation.address}</p>
        <p>Phone: {this.props.organisation.phone}</p>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganisationById: (id) => {
      dispatch(fetchOrganisationById(id))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    organisation: state.organisation || {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
