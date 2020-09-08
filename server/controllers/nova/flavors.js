const { callBack } = require('../../lib/util')
const { initNova } = require('./index')

exports.getFlavorById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const nova = initNova(req)
    nova.getFlavor(id, callBack(res))
  }
}

exports.getFlavors = (req, res) => {
  const nova = initNova(req)
  nova.listFlavors(callBack(res))
}
