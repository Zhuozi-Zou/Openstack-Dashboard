const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')
const jwt = require('jsonwebtoken')

let neutron = ''

const getNewNeutron = (token, req) => {
  console.log('=====authTokenNeutron renewed=====')
  neutron = new osWrap.Neutron(apiAccess.network, token)
  req.session.authTokenNeutron = token
}

exports.initNeutron = (req) => {
  const authToken = req.session.authTokenNeutron
  jwt.verify(authToken, 'openstack token', (error, decode) => {
    if (error) {
      getNewNeutron(req.token, req)
    }
  })
  return neutron
}
