const { callBack } = require('../../lib/util')
const { initNova } = require('./index')

exports.getInstanceById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const nova = initNova(req)
    nova.getServer(id, callBack(res))
  }
}

exports.getInstances = (req, res) => {
  const nova = initNova(req)
  nova.listServers({}, callBack(res))
}
