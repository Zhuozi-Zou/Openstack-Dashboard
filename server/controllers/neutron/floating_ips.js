const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest, callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getFloatingIps = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()
  else {
    const neutron = initNeutron(req, token)
    neutron.listFloatingIps({}, callBack(res))
  }
}

exports.getFloatingIpById = (req, res) => {
  const { token, id } = req.query
  if (!token) res.status(401).send()
  else if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req, token)
    neutron.getFloatingIp(id, callBack(res))
  }
}

exports.createFloatingIp = (req, res) => {
  const { token, floatingip } = req.body
  console.log(typeof floatingip)
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

exports.deleteFloatingIp = (req, res) => {
  const { token, id } = req.body
  if (!token) res.status(401).send()
  else if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req, token)
    neutron.removeFloatingIp(id, callBack(res))
  }
}

exports.disassociateFloatingIp = (req, res) => {
  const { token, ipId } = req.body
  if (!token) res.status(401).send()
  else if (!ipId) res.status(400).send()
  else {
    const neutron = initNeutron(req, token)
    neutron.updateFloatingIp(ipId, null, callBack(res))
  }
}

exports.associateFloatingIp = (req, res) => {
  const { token, ipId, portId } = req.body
  if (!token) res.status(401).send()
  else if (!ipId || !portId) res.status(400).send()
  else {
    const neutron = initNeutron(req, token)
    neutron.updateFloatingIp(ipId, 'f4c1b2da-b1d2-4516-925a-d7916ad28f60', callBack(res))
  }
}
