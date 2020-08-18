const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest, callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getNetworks = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).send()
  } else {
    const options = getOptions('/v2.0/networks', 'GET', token)
    httpRequest(options, res)
  }
}

exports.getNetworkById = (req, res) => {
  const token = req.cookies.token
  const { id } = req.query
  if (!token) {
    res.status(401).send()
  } else if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks?id=${id}`, 'GET', token)
    httpRequest(options, res)
  }
}

exports.getSubnetById = (req, res) => {
  const token = req.cookies.token
  const { id } = req.query
  if (!token) {
    res.status(401).send()
  } else if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/subnets?id=${id}`, 'GET', token)
    httpRequest(options, res)
  }
}

exports.updateNetworkById = (req, res) => {
  const token = req.cookies.token
  const { id, network } = req.body
  if (!token) {
    res.status(401).send()
  } else if (!id || !network) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks/${id}`, 'PUT', token)
    const networkString = JSON.stringify({ network })
    options.headers['Content-Length'] = networkString.length
    httpRequest(options, res, networkString)
  }
}

exports.createNetwork = (req, res) => {
  const token = req.cookies.token
  const { network } = req.body
  if (!token) {
    res.status(401).send()
  } else if (!network) {
    res.status(400).send()
  } else {
    const options = getOptions('/v2.0/networks', 'POST', token)
    const networkString = JSON.stringify({ network })
    options.headers['Content-Length'] = networkString.length
    httpRequest(options, res, networkString)
  }
}

exports.createSubnet = (req, res) => {
  const token = req.cookies.token
  const { subnet } = req.body
  if (!token) {
    res.status(401).send()
  } else if (!subnet) {
    res.status(400).send()
  } else {
    const options = getOptions('/v2.0/subnets', 'POST', token)
    const subnetString = JSON.stringify({ subnet })
    options.headers['Content-Length'] = subnetString.length
    httpRequest(options, res, subnetString)
  }
}

exports.deleteNetwork = (req, res) => {
  const token = req.cookies.token
  const { id } = req.body
  if (!token) {
    res.status(401).send()
  } else if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/networks/${id}`, 'DELETE', token)
    httpRequest(options, res)
  }
}

exports.getPorts = (req, res) => {
  const token = req.cookies.token
  const { filters } = req.query
  const filtersObj = typeof (filters) === 'string' ? JSON.parse(filters) : {}
  if (!token) {
    res.status(401).send()
  } else {
    const neutron = initNeutron(req, token)
    neutron.listPorts({ filters: filtersObj }, callBack(res))
  }
}
