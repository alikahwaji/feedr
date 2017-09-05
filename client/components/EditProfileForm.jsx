import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import {updateOrganisation, fetchOrganisation, updateAuthProfile} from '../actions'

class EditProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitted: false,
      name: '',
      address: '',
      type: '',
      ...this.props.organisation
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      ...nextProps.organisation
    })
  }
  componentDidMount () {
    this.props.fetchOrganisation()
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.updateAuthProfile(this.state)
    setTimeout(() => {
      this.setState({submitted: true})
    }, 100)
  }
  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render () {
    const {name, type, address, phone} = this.state
    return this.state.submitted ? (
      <Redirect to="/profile"/>
    ) : (
      <div className='editProfileContainer'>
        <h1>Edit Profile</h1>
        <form className="editProfileForm" onSubmit={this.handleSubmit}>
          <label>
                Name:
            <input type="text" name="name" value={name} onChange={this.handleChange}/>
          </label>
          <label>
                Address:
            <input type="text" name="address" value={address} onChange={this.handleChange}/>
          </label>
          <label>
                Phone:
            <input type="text" name="phone" value={phone} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

EditProfile.propTypes = {
  organisation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const {name, address, phone, type } = state.organisation || {}
  return {
    organisation: {
      name,
      address,
      phone,
      type
    }
  }
}
function mapDispatchToProps (dispatch) {
  return {
    fetchOrganisation: () => dispatch(fetchOrganisation()),
    updateOrganisation: (organisation) => dispatch(updateOrganisation(organisation)),
    updateAuthProfile: (profileData) => dispatch(updateAuthProfile(profileData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
