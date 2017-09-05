import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { login, doAuthentication, logout } from '../actions/auth'

class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedOut: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount () {
    this.props.doAuthentication()
  }
  componentDidUpdate () {
    this.setState({loggedOut: false})
  }
  handleLogin () {
    this.props.login(this.props.location.pathname)
  }
  handleLogout (event) {
    this.props.logout(event)
    this.setState({loggedOut: true})
  }
  render () {
    const { profile, loggedIn } = this.props
    if (this.state.loggedOut) {
      return <Redirect to={'/'} />
    } else {
      return (
        <div className='log-io-btn'>
          {loggedIn &&
           <div>
             <button className="navbutton" onClick={this.handleLogout}>Log out</button>
           </div>
          }
          {!loggedIn &&
          <button className="navbutton" onClick={this.handleLogin}>
            Login / Sign Up
          </button>
          }
        </div>
      )
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    doAuthentication: () => dispatch(doAuthentication()),
    login: (route) => dispatch(login(route)),
    logout: () => dispatch(logout())
  }
}
function mapStateToProps (state) {
  return {
    profile: state.auth.profile,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
