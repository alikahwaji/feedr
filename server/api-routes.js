require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const verifyJwt = require('express-jwt')

const db = require('./db')

const router = express.Router()

router.use(bodyParser.json())

function getSecret (req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

router.get('/listings', (req, res) => {
  // fetch listings
  db.getListings()
    .then(listings => {
      res.json(listings)
    })
})

router.post('/listings',
  // PUT VERIFYJWT IN FOR EVERY SECURE ROUTE PROCESS
  verifyJwt({
    secret: getSecret
  }),
  (req, res) => {
    // add a new listing
    const addedMsg = 'New Listing successfully added with id: '
    const newListing = req.body
    db.addListing(newListing)
      .then((listingID) => {
        return res.status(201).send(addedMsg + listingID)
      })
      .catch(err => {
        if (err) {
          res.status(500).send(err.message)
        }
      })
  }
)

router.get('/listings/:id', (req, res) => {
  // get a listing by id
  let ListingId = req.params.id
  db.getListingById(ListingId)
    .then(listing => {
      res.json(listing)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.put('/listings/:id',(req, res) => {
  // update a listing
  let listingId = Number(req.params.id)
  let listing = req.body
  db.updateListing(listingId, listing)
    .then(() => {
      res.status(202).end()
    })
    .catch(err => {
      if (err) {
        res.status(500).send(err.message)
      }
    })
})

router.post('/organisation', (req, res) => {
  // add new organisation
  const newOrg = req.body.newOrg
  db.addOrganisation(newOrg)
    .then(orgID => {
      res.status(201).send(orgID)
    })
    .catch(err => {
      if (err) {
        res.status(500).send(err.message)
      }
    })
})

router.get('/organisation',
  verifyJwt({ secret: getSecret }),
  (req, res) => {
    console.log(req.user)
    db.getOrg(req.user.sub)
      .then(organisation => {
        console.log(organisation)
        res.json(organisation)
      })
  })

router.put('/organisation',
  verifyJwt({ secret: getSecret }),
  (req, res) => {
    console.log(req.body)
    db.getOrg(req.user.sub)
      .then((organisation) => {
        db.updateOrg(organisation.id, req.body)
          .then(() => db.getOrg(req.user.sub)
            .then(newOrganisation => res.status(200).send(newOrganisation)))
      })
  }
)

router.get('/profile/:id', (req, res) => {
  // get an organisation
  let id = req.params.id
  db.getProviderById(id)
    .then(profile => {
      res.json(profile)
    })
    .catch(err => {
      if (err) {
        res.status(500).send(err.message)
      }
    })
})

router.delete('/listings/:id', (req, res) => {
  const listID = req.params.id
  db.removeListing(listID)
    .then(id => {
      res.status(202).end()
    })
})

router.post('/authenticate',
  verifyJwt({
    secret: getSecret
  }),
  (req, res) => {
    let userMeta = req.body.user_metadata
    let userData = {
      auth0_id: req.user.sub,
      name: userMeta.name,
      address: userMeta.address,
      phone: userMeta.phone,
      email: req.body.email,
      type: userMeta.type
    }
    let orgId = req.user.sub
    db.getOrg(orgId) // find if org exists
      .then(org => {
        if (org) { // if org exists
          return res.json(org) // returns organisation info
        } else {
          db.addOrganisation(userData) // add organisation if doesnt exist
            .then((org) => {
              res.status(201).json(org) // returns new organisations id
            })
        }
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  }
)

module.exports = router
