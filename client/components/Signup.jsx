import React from 'react'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phoneNumber: '',
      businessType: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    alert('You created a new account: ' + this.state.name)
    event.preventDefault()
  }

  render () {
    return (
      <div className='signup-container'>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit} className='signup-form'>
          <label className='signup-form-element'>
            Name:
            <input type='text' value={this.state.name} onChange={this.handleChange} name='name' />
          </label>
          <label className='signup-form-element'>
            Address:
            <input type='text' value={this.state.address} onChange={this.handleChange} name='address' />
          </label>
          <label className='signup-form-element'>
            Phone Number:
            <input type='text' value={this.state.phoneNumber} onChange={this.handleChange} name='phoneNumber' />
          </label>
          <label className='signup-form-element'>
            Type of Business:
            <input type='text' value={this.state.businessType} onChange={this.handleChange} name='businessType' />
          </label>
          <input type='submit' value='submit' onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
