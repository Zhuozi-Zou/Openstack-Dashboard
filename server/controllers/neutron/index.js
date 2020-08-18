const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')

let neutron = ''

exports.initNeutron = (req, res) => {
  const token = req.cookies.token
  if (!token) res.status(401).send()

  const authToken = req.session.authTokenNeutron
  if (!authToken || authToken !== token) {
    console.log('=====authTokenNeutron renewed=====')
    neutron = new osWrap.Neutron(apiAccess.network, token)
    req.session.authTokenNeutron = token
  }
  return neutron
}
