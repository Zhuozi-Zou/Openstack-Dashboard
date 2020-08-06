const { host } = require('../config')
const port = 9696
const getOptions = require('../lib/util').getOptions(host, port)
const { httpRequest } = require('../lib/util')

exports.getNetworks = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()

  const options = getOptions('/v2.0/networks', 'GET', token)
  httpRequest(options, res)
}

exports.getSubnetById = (req, res) => {
  const { token, id } = req.query
  if (!token) res.status(401).send()
  if (!id) res.status(400).send()

  const options = getOptions(`/v2.0/subnets?id=${id}`, 'GET', token)
  httpRequest(options, res)
}

exports.updateNetworkById = (req, res) => {
  const { token, id, network } = req.body
  if (!token) res.status(401).send()
  if (!id || !network) res.status(400).send()

  const options = getOptions(`/v2.0/networks/${id}`, 'PUT', token)
  const networkString = JSON.stringify({ network })
  options.headers['Content-Length'] = networkString.length
  httpRequest(options, res, networkString)
}

exports.createNetwork = (req, res) => {
  const { token, network } = req.body
  if (!token) res.status(401).send()
  if (!network) res.status(400).send()

  const options = getOptions('/v2.0/networks', 'POST', token)
  const networkString = JSON.stringify({ network })
  options.headers['Content-Length'] = networkString.length
  httpRequest(options, res, networkString)
}

exports.createSubnet = (req, res) => {
  const { token, subnet } = req.body
  if (!token) res.status(401).send()
  if (!subnet) res.status(400).send()

  const options = getOptions('/v2.0/subnets', 'POST', token)
  const subnetString = JSON.stringify({ subnet })
  options.headers['Content-Length'] = subnetString.length
  httpRequest(options, res, subnetString)
}

exports.deleteNetwork = (req, res) => {
  const { token, id } = req.body
  if (!token) res.status(401).send()
  if (!id) res.status(400).send()

  const options = getOptions(`/v2.0/networks/${id}`, 'DELETE', token)
  httpRequest(options, res)
}
