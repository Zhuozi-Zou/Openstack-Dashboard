module.exports = function (app) {
  const keystone = require('../controllers/keystone')
  const neutron = require('../controllers/neutron')

  app.get('/keystone/getAdminToken', keystone.getAdminToken)

  app.get('/neutron/getNetworks', neutron.getNetworks)
  app.get('/neutron/getSubnetById', neutron.getSubnetById)
  app.post('/neutron/createNetwork', neutron.createNetwork)
  app.post('/neutron/createSubnet', neutron.createSubnet)
  app.put('/neutron/updateNetworkById', neutron.updateNetworkById)
}
