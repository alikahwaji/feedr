import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'

function Navbar (props) { // props.loggedIn
  return (
    <div className='navbar'>
      <div className='home-icon'>
        <Link to='/'>
          <img src="/images/watermelon.svg" alt="home" height="42" width="42"/>
        </Link>
      </div>
      <div className='title'>
        <Link to='/'><h1> Feedr </h1></Link>
      </div>
      {props.loggedIn &&
      <div className="navbutton">
        <Link to='/listings'>
          <button className="navbutton">Listings</button>
        </Link>
      </div>
      }{props.loggedIn &&
      <div className="navbutton">
        <Link to='/profile'>
          <button className="navbutton">Profile</button>
        </Link>
      </div>
      }
      <div className="navbutton">
        <Auth location={props.location} />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Navbar)
