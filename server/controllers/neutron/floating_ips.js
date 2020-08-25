const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest, callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getFloatingIps = (req, res) => {
  const neutron = initNeutron(req)
  neutron.listFloatingIps({}, callBack(res))
}

exports.getFloatingIpById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.getFloatingIp(id, callBack(res))
  }
}

exports.createFloatingIp = (req, res) => {
  const token = req.token
  const { floatingip } = req.body
  if (!floatingip) res.status(400).send()
  else {
    const options = getOptions('/v2.0/floatingips', 'POST', token)
    const floatingipString = JSON.stringify({ floatingip })
    options.headers['Content-Length'] = floatingipString.length
    httpRequest(options, res, floatingipString)
  }
}

exports.getFloatingIpPools = (req, res) => {
  const token = req.token
  const options = getOptions('/v2.0/floatingip_pools', 'GET', token)
  httpRequest(options, res)
}

exports.deleteFloatingIp = (req, res) => {
  const { id } = req.body
  if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.removeFloatingIp(id, callBack(res))
  }
}

exports.disassociateFloatingIp = (req, res) => {
  const { ipId } = req.body
  if (!ipId) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.updateFloatingIp(ipId, null, callBack(res))
  }
}

exports.associateFloatingIp = (req, res) => {
  const { ipId, portId } = req.body
  if (!ipId || !portId) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.updateFloatingIp(ipId, portId, callBack(res))
  }
}
