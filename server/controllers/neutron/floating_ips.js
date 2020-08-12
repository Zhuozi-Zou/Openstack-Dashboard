const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')
const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest, callBack } = require('../../lib/util')

let neutron = ''

const initNeutron = (req, token) => {
  const authToken = req.session.authTokenNeutron
  if (!authToken || authToken !== token) {
    console.log('=====authTokenNeutron renewed=====')
    neutron = new osWrap.Neutron(apiAccess.network, token)
    req.session.authTokenNeutron = token
  }
}

exports.getFloatingIps = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()
  else {
    initNeutron(req, token)
    neutron.listFloatingIps({}, callBack(res))
  }
}

exports.createFloatingIp = (req, res) => {
  const { token, floatingip } = req.body
  if (!token) res.status(401).send()
  else if (!floatingip) res.status(400).send()
  else {
    const options = getOptions('/v2.0/floatingips', 'POST', token)
    const floatingipString = JSON.stringify({ floatingip })
    options.headers['Content-Length'] = floatingipString.length
    httpRequest(options, res, floatingipString)
  }
}

exports.getFloatingIpPools = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()
  else {
    const options = getOptions('/v2.0/floatingip_pools', 'GET', token)
    httpRequest(options, res)
  }
}
