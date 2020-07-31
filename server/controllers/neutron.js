const http = require('http')
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
