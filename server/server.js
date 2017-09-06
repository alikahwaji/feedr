var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var server = express()

const apiRoutes = require('./api-routes')

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1', apiRoutes)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
