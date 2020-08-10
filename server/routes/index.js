module.exports = function (app) {
  const auth = require('../controllers/keystone/auth')
  const networks = require('../controllers/neutron/networks')

  app.get('/keystone/auth/getAdminToken', auth.getAdminToken)

  app.get('/neutron/networks/getNetworks', networks.getNetworks)
  app.get('/neutron/networks/getSubnetById', networks.getSubnetById)
  app.post('/neutron/networks/createNetwork', networks.createNetwork)
  app.post('/neutron/networks/createSubnet', networks.createSubnet)
  app.put('/neutron/networks/updateNetworkById', networks.updateNetworkById)
  app.delete('/neutron/networks/deleteNetwork', networks.deleteNetwork)
}
