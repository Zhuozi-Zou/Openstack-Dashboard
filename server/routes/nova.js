const express = require('express')
const nova = express.Router()
const instances = require('../controllers/nova/instances')

nova.get('/getInstanceById', instances.getInstanceById)
nova.get('/getInstances', instances.getInstances)

module.exports = nova
