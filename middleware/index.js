let express = require('express')
let auth = require('./auth')
let router = express.Router()

// register menu register
router.post('/api/v1/register', auth.registration)
router.post('/api/v1/login', auth.login)

module.exports = router