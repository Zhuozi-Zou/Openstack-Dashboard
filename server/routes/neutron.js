const express = require('express')
const neutron = express.Router()
const networks = require('../controllers/neutron/networks')
const floatingIps = require('../controllers/neutron/floating_ips')
const stats = require('../controllers/neutron/stats')

neutron.get('/getNetworks', networks.getNetworks)
neutron.get('/getNetworkById', networks.getNetworkById)
neutron.get('/getSubnetById', networks.getSubnetById)
neutron.get('/getPorts', networks.getPorts)
neutron.post('/createNetwork', networks.createNetwork)
neutron.post('/createSubnet', networks.createSubnet)
neutron.put('/updateNetworkById', networks.updateNetworkById)
neutron.delete('/deleteNetwork', networks.deleteNetwork)

neutron.get('/getFloatingIps', floatingIps.getFloatingIps)
neutron.get('/getFloatingIpById', floatingIps.getFloatingIpById)
neutron.get('/getFloatingIpPools', floatingIps.getFloatingIpPools)
neutron.post('/createFloatingIp', floatingIps.createFloatingIp)
neutron.put('/disassociateFloatingIp', floatingIps.disassociateFloatingIp)
neutron.put('/associateFloatingIp', floatingIps.associateFloatingIp)
neutron.delete('/deleteFloatingIp', floatingIps.deleteFloatingIp)

neutron.get('/getQuotaDetailsByProjectId', stats.getQuotaDetailsByProjectId)

module.exports = neutron
