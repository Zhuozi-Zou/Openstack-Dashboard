const express = require('express')
const nova = express.Router()
const instances = require('../controllers/nova/instances')
const flavors = require('../controllers/nova/flavors')
const stats = require('../controllers/nova/stats')

nova.get('/getInstanceById', instances.getInstanceById)
nova.get('/getInstances', instances.getInstances)

nova.get('/getFlavorById', flavors.getFlavorById)
nova.get('/getFlavors', flavors.getFlavors)

nova.get('/getUsageByProjectId', stats.getUsageByProjectId)
nova.get('/getQuotaByProjectId', stats.getQuotaByProjectId)

module.exports = nova
