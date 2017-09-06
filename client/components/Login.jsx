import React from 'react'
import { connect } from 'react-redux'
import { resumeAuth } from '../actions/auth'

class Login extends React.Component {
  componentDidMount () {
    this.props.resumeAuth(this.props.location.hash, this.props.history)
  }
  render () {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resumeAuth: (hash, history) => dispatch(resumeAuth(hash, history))
  }
}

export default connect(null, mapDispatchToProps)(Login)
