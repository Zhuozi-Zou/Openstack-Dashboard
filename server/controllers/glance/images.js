const { callBack } = require('../../lib/util')
const { initGlance } = require('./index')

exports.getImageById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const glance = initGlance(req)
    glance.getImage(id, callBack(res))
  }
}

exports.getImages = (req, res) => {
  const glance = initGlance(req)
  glance.listImages(callBack(res))
}
