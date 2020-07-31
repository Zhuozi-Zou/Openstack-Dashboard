const http = require('http')
const { host } = require('../config')
const port = 9696
const getOptions = require('../lib/util').getOptions(host, port)

exports.getNetworks = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()

  const options = getOptions('/v2.0/networks', 'GET')
  options.headers['X-Auth-Token'] = token
  let data = ''

  const request = http.request(options, (response) => {
    response.on('data', d => {
      data += data + d
    }).on('end', () => {
      res.send({
        code: response.statusCode,
        data: JSON.parse(data)
      })
    })
  })

  request.on('error', function (e) {
    console.log('Got error: ' + e.message)
  })

  request.end()
}

exports.getNetworkById = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()

  const options = getOptions('/v2.0/networks', 'GET')
  options.headers['X-Auth-Token'] = token
}
