import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { fetchListingDetails, updateListing } from '../actions/listings'

class EditListing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      provider: props.provider,
      category: props.category,
      description: props.description,
      date: props.date,
      id: this.props.match.params.id,
      submitted: false
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getListing(id)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      provider: nextProps.provider,
      category: nextProps.category,
      description: nextProps.description,
      date: nextProps.date
    })
  }

  handleEdit (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    const listing = {
      id: this.state.id,
      provider: this.state.provider,
      category: this.state.category,
      description: this.state.description,
      date: this.state.date
    }
    this.setState({submitted: true})
    this.props.updateListing(listing)
    event.preventDefault()
  }

  render () {
    if (this.state.submitted) {
      return <Redirect to={'/listings/' + this.state.id}/>
    } else {
      return (
        <div className='editListingContainer'>
          <h1>Edit Listing Page</h1>
          <form className="editListingForm" onSubmit={this.handleEdit}>
            <input type='hidden' value={this.state.id} name='id' />
            <label>
            Description:
              <input type='text' value={this.state.description} onChange={this.handleEdit} name='description'/>
            </label>
            <label>Type of Donation: </label>
            <select name="category" defaultValue={this.state.category} onChange={this.handleEdit}>
              <option value="1">Canned goods</option>
              <option value="2">Fresh Fruit/Veg</option>
              <option value="3">Ready to eat meals</option>
              <option value="4">Baked goods</option>
              <option value="5">Other</option>
            </select>
            <label>
            Use-by Date:
              <input type='datetime-local' value={this.state.date} onChange={this.handleEdit}name='date'/>
            </label>
            <input type='submit' value='SUBMIT' onClick={this.handleSubmit} />
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.activeListing.id,
    provider: state.activeListing.providerName,
    category: state.activeListing.categoryId,
    description: state.activeListing.description,
    date: state.activeListing.itemExpiry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListing: (id) => dispatch(fetchListingDetails(id)),
    updateListing: (listing) => dispatch(updateListing(listing))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListing)
