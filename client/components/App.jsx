import React from 'react'
import ListItem from './IndividualListItem'
import {Route} from 'react-router-dom'

import AllListings from './AllListings'
import Signup from './Signup'
import Navbar from './Navbar'
import ListingDetails from './ListingDetails'
import Landing from './Index'
import EditListing from './EditListing'
import NewListing from './NewListing'
import Profile from './Profile'
import EditProfile from './EditProfileForm'
import MyProfile from './MyProfile'
import Footer from './Footer'
import Login from './Login'

const App = () => (
  <div className='app'>
    <Route component={Navbar} />
    <Route path='/login/callback' component={Login} />
    <Route exact path='/' component={Landing} />
    <Route path='/new' component={NewListing}/>
    <Route path='/listings/:id/edit' component={EditListing} />
    <Route exact path= '/profile' component={MyProfile} />
    <Route exact path='/profiles/:id' component={Profile}/>
    <Route exact path='/listings' component={AllListings} />
    <Route exact path='/listings/:id' component={ListingDetails} />
    <Route path='/signup' component={Signup} />
    <Route exact path ='/profile/edit' component={EditProfile}/>
    <Footer />
  </div>
)

export default App
