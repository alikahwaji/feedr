import Auth0Lock from 'auth0-lock'
import auth0 from 'auth0-js'
// Initializing our Auth0Lock

const options = {
  allowLogin: true,
  allowSignUp: true,
  loginAfterSignUp: true,
  auth: {
    redirectUrl: `http://${process.env.HOST}:${process.env.PORT}/login/callback`,
    responseType: 'id_token token'
  },
  additionalSignUpFields: [{
    name: 'name',
    placeholder: 'Organisations Name'
  }, {
    name: 'address',
    placeholder: 'enter your address'
  }, {
    name: 'phone',
    placeholder: 'enter your contact number'
  }, {
    name: 'type',
    type: 'select',
    placeholder: 'Organisation type',
    options: [{
      value: 'business', label: 'Business'
    }, {
      value: 'charity', label: 'Charity'
    }]
  }]
}

class Auth {
  constructor () {
    this.lock = new Auth0Lock(
      '55NyTjgRNtlLOy08Qr0kfeV3QAqAPGiz',
      'horoeka017.au.auth0.com',
      options
    )
    this.profile = JSON.parse(localStorage.getItem('profile'))
    this.token = localStorage.getItem('id_token')
    this.id = Number(localStorage.getItem('userId'))
    this.setId = this.setId.bind(this)
  }
  setId (id) {
    this.id = id
    localStorage.setItem('userId', id)
  }

  isLoggedIn () {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    // check if token exists and the token is not past expiry time
    return !!this.token && (new Date().getTime() < expiresAt)
  }

  login (newOptions) {
    this.lock.show(newOptions)
  }

  authListener (cb) {
    this.lock.on('authenticated', (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        this.setUserInfo(authResult, profile)
        cb(error, authResult.accessToken, profile)
      })
    })
  }

  setUserInfo (authResult, profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    localStorage.setItem('id_token', authResult.idToken)
    const expiresAt = JSON.stringify((authResult.idTokenPayload.exp * 1000) + new Date().getTime())
    localStorage.setItem('expires_at', expiresAt)
    this.profile = profile
    this.token = authResult.idToken
  }

  logout () {
    this.profile = null
    this.token = null
    localStorage.removeItem('profile')
    localStorage.removeItem('id_token')
  }

  getToken () {
    return this.token
  }

  updateProfile (profileData, cb) {
    const auth0Manage = new auth0.Management({
      token: this.getToken(),
      domain: 'horoeka017.au.auth0.com'
    })
    auth0Manage.patchUserMetadata(this.profile.user_id, profileData, (err, user) => {
      if (err) {
        cb(err)
      } else {
        cb(null, user)
      }
    })
  }
}

export default new Auth()
