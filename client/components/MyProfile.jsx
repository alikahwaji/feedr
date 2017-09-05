import React from 'react'

import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import {fetchOrganisationById} from '../actions'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.fetchOrganisationById(this.props.match.params.id)
  }
  render () {
    return (
      <div className='profilePageContainer'>
        <h1 className='profileHeader'> Profile</h1>
        <h4 className='profileSubheader'>Welcome {this.props.userInfo.name}, to your profile</h4>
        <div className="profileContents">
          <p>Business Name: {this.props.userInfo.name}</p>
          <p>Address: {this.props.userInfo.address}</p>
          <p>Email: {this.props.userInfo.email}</p>
          <p>Phone: {this.props.userInfo.phone}</p>
          <p>Type: {this.props.userInfo.type}</p>
          <div>
            <Link to='/profile/edit'>
              <button className="editProfileButton">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
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
  const userInfo = state.auth.profile
  const userMeta = state.auth.profile.user_metadata

  return {
    userInfo: {
      email: userInfo.email || '',
      address: userMeta.address || '',
      name: userMeta.name || '',
      phone: userMeta.phone || '',
      type: userMeta.type || ''
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
