let express = require('express')
let auth = require('./auth')
let router = express.Router()
let verification = require('./verification')

// register menu register
router.post('/api/v1/register', auth.registration)
router.post('/api/v1/login', auth.login)

// url need authorization
router.get('/api/v1/private', verification(), auth.anonymousePage)

module.exports = router