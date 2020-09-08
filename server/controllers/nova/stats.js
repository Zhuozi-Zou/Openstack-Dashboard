const { httpRequest, callBack } = require('../../lib/util')
const { initNova } = require('./index')
const { host } = require('../../config')
const port = 8774
const getOptions = require('../../lib/util').getOptions(host, port)

exports.getUsageByProjectId = (req, res) => {
  const { id, start, end } = req.query
  if (!id) res.status(400).send()
  else {
    const token = req.token
    let url = '/v2.1/os-simple-tenant-usage/' + id

    if (start) {
      const startStr = (typeof start) === 'string' ? start : start.toISOString()
      const startDateStr = '?start=' + startStr.replace('Z', '')
      url = url + startDateStr

      if (end) {
        const endStr = (typeof end) === 'string' ? end : end.toISOString()
        const endDateStr = '&end=' + endStr.replace('Z', '')
        url = url + endDateStr
      }
    }

    const options = getOptions(url, 'GET', token)
    httpRequest(options, res)
  }
}

exports.getQuotaByProjectId = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const nova = initNova(req)
    nova.getQuotaSet(id, callBack(res))
  }
}
