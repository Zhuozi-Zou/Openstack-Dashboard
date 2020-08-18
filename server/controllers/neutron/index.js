const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')

let neutron = ''

exports.initNeutron = (req, token) => {
  const authToken = req.session.authTokenNeutron
  if (!authToken || authToken !== token) {
    console.log('=====authTokenNeutron renewed=====')
    neutron = new osWrap.Neutron(apiAccess.network, token)
    req.session.authTokenNeutron = token
  }
  return neutron
}
