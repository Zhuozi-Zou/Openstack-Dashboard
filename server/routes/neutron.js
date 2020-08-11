const express = require('express')
const neutron = express.Router()
const networks = require('../controllers/neutron/networks')
const floatingIps = require('../controllers/neutron/floating_ips')

neutron.get('/getNetworks', networks.getNetworks)
neutron.get('/getSubnetById', networks.getSubnetById)
neutron.post('/createNetwork', networks.createNetwork)
neutron.post('/createSubnet', networks.createSubnet)
neutron.put('/updateNetworkById', networks.updateNetworkById)
neutron.delete('/deleteNetwork', networks.deleteNetwork)

neutron.get('/getFloatingIps', floatingIps.getFloatingIps)

module.exports = neutron
