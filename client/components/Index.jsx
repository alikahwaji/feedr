import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export default class Landing extends React.Component {
  render () {
    return (
      <div className='landing-page'>
        <h1>Why Food Wastage is a Big Problem !!</h1>
        <div className='mission-statement'>
          <h1>About Feedr</h1>
          <p className='copy'>
          Here at Feedr <em>waste</em> is a dirty word! Together we can reduce food wastage
          and feed hungry mouths all over New Zealand. Feedr is a web app that connects
          business owners and charities so that fresh, excess food
          can be saved from the rubbish bin and distributed to those who need it.
          Business owners simply need to signup and add a listing when they have excess
          food to get rid of, and charities then have the opportunity to claim that item.
          Our aim is to facilitate the interaction between those who have food, and those who need it.
          </p>
        </div>
      </div>
    )
  }
}
