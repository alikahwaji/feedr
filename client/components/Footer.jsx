import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'

function Footer (props) {
  return (
    <div className='footer'>
      <div className="navbutton">
        <Link to='/'>
          <button className="navbutton">Home</button>
        </Link>
      </div>
      <div className="navbutton">
        <form method="post" action="mailto:feedrnz@gmail.com" >
          <input type="submit" value="Contact us" />
        </form>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(Footer)
