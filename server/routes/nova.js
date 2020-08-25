const express = require('express')
const nova = express.Router()
const instances = require('../controllers/nova/instances')
const flavors = require('../controllers/nova/flavors')

nova.get('/getInstanceById', instances.getInstanceById)
nova.get('/getInstances', instances.getInstances)

nova.get('/getFlavorById', flavors.getFlavorById)

module.exports = nova
