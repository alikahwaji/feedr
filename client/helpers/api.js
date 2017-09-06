import request from 'superagent'

import auth from './auth'

export default function api ({type = 'get', route, data}, cb) {
  let action = 'send'
  if (type === 'get' && data) {
    action = 'query'
  } else if (type === 'put' && data) {
    action = 'send'
  } else if (type === 'delete') {
    action = 'delete'
  }
  // sets type to either get or post, adjusts action to send or query
  request[type](route)[action](data)
    .set({Authorization: `Bearer ${auth.getToken()}`})
    .end((err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, res)
    }
    )
}
