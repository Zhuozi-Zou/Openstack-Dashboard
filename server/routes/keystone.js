const express = require('express')
const keystone = express.Router()
const auth = require('../controllers/keystone/auth')

keystone.get('/getAdminToken', auth.getAdminToken)

module.exports = keystone
