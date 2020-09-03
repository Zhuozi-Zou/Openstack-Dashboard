const express = require('express')
const keystone = express.Router()
const auth = require('../controllers/keystone/auth')
const projects = require('../controllers/keystone/projects')

keystone.get('/getAdminToken', auth.getAdminToken)

keystone.get('/getProjectById', projects.getProjectById)

module.exports = keystone
