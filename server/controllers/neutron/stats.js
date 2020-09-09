const { host } = require('../../config')
const port = 9696
const getOptions = require('../../lib/util').getOptions(host, port)
const { httpRequest } = require('../../lib/util')

exports.getQuotaDetailsByProjectId = (req, res) => {
  const token = req.token
  const { id } = req.query
  if (!id) {
    res.status(400).send()
  } else {
    const options = getOptions(`/v2.0/quotas/${id}/details.json`, 'GET', token)
    httpRequest(options, res)
  }
}
