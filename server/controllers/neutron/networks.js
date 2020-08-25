const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest, callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getNetworks = (req, res) => {
  const token = req.token
  const options = getOptions('/v2.0/networks', 'GET', token)
  httpRequest(options, res)
}

exports.getNetworkById = (req, res) => {
  const token = req.token
  const { id } = req.query
  if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks?id=${id}`, 'GET', token)
    httpRequest(options, res)
  }
}

exports.getSubnetById = (req, res) => {
  const token = req.token
  const { id } = req.query
  if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/subnets?id=${id}`, 'GET', token)
    httpRequest(options, res)
  }
}

exports.updateNetworkById = (req, res) => {
  const token = req.token
  const { id, network } = req.body
  if (!id || !network) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks/${id}`, 'PUT', token)
    const networkString = JSON.stringify({ network })
    options.headers['Content-Length'] = networkString.length
    httpRequest(options, res, networkString)
  }
}

exports.createNetwork = (req, res) => {
  const token = req.token
  const { network } = req.body
  if (!network) {
    res.status(400).send()
  } else {
    const options = getOptions('/v2.0/networks', 'POST', token)
    const networkString = JSON.stringify({ network })
    options.headers['Content-Length'] = networkString.length
    httpRequest(options, res, networkString)
  }
}

exports.createSubnet = (req, res) => {
  const token = req.token
  const { subnet } = req.body
  if (!subnet) {
    res.status(400).send()
  } else {
    const options = getOptions('/v2.0/subnets', 'POST', token)
    const subnetString = JSON.stringify({ subnet })
    options.headers['Content-Length'] = subnetString.length
    httpRequest(options, res, subnetString)
  }
}

exports.deleteNetwork = (req, res) => {
  const token = req.token
  const { id } = req.body
  if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks/${id}`, 'DELETE', token)
    httpRequest(options, res)
  }
}

exports.getPorts = (req, res) => {
  const { filters } = req.query
  const filtersObj = typeof (filters) === 'string' ? JSON.parse(filters) : {}
  const neutron = initNeutron(req)
  neutron.listPorts({ filters: filtersObj }, callBack(res))
}
