const express = require('express')
const nova = express.Router()
const instances = require('../controllers/nova/instances')

nova.get('/getInstanceById', instances.getInstanceById)

module.exports = nova
