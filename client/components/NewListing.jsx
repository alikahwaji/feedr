import React from 'react'
import {connect} from 'react-redux'
import { actions, Control, Form } from 'react-redux-form'
import {addListing, fetchListings} from '../actions/listings'
import { Route, Redirect } from 'react-router'
import Navbar from './Navbar'

class NewListing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listings: props.listings,
      auth: props.userInfo,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log(this.state)
  }

  componentDidMount () {
    this.props.fetchListings()
  }

  handleSubmit (listing) {
    this.setState({submitted: true})
    this.props.addListing(listing)
  }

  render () {
    if (this.state.submitted) {
      return <Redirect to="/listings"/>
    } else {
      return (
        <div className='newListingContainer'>
          <h1 className='createNewListingHeader'>CREATE A NEW LISTING</h1>
          <div className='newListingFormContainer'>
            <div className='newListingForm'>

              <Form model="listing" onSubmit={this.handleSubmit}>
                <Control model=".providerId" defaultValue={`${this.state.auth.id}`} type="hidden">
                </Control>

                <label>Type of Donation: </label>
                <Control.select model=".categoryId" defaultValue="1">
                  <option value="1">Canned goods</option>
                  <option value="2">Fresh Fruit/Veg</option>
                  <option value="3">Ready to eat meals</option>
                  <option value="4">Baked goods</option>
                  <option value="5">Other</option>
                </Control.select>

                <label>Description: </label>
                <Control.textarea className="descriptionField" model=".description" />

                <label>Pickup Time: </label>
                <Control.text model=".itemExpiry" />

                <label>Use before: </label>
                <br />
                <Control type="date" model=".pickupTime" />
                <br />
                <br />
                <button className="submit" type="submit">Submit</button>
              </Form>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    listings: state.listings,
    userInfo: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addListing: (listing) => {
      dispatch(addListing(listing))
    },
    fetchListings: () => {
      dispatch(fetchListings())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewListing)
