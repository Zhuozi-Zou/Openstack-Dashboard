const { host } = require('../../config')
const port = 5000
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest } = require('../../lib/util')

exports.getProjectById = (req, res) => {
  const token = req.token
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const options = getOptions('/v3/projects/' + id, 'GET', token)
    httpRequest(options, res)
  }
}
