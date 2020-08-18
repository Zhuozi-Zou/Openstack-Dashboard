const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')

let nova = ''

exports.initNova = (req, res) => {
  const token = req.cookies.token
  if (!token) res.status(401).send()

  const authToken = req.session.authTokenNova
  if (!authToken || authToken !== token) {
    console.log('=====authTokenNova renewed=====')
    nova = new osWrap.Nova(apiAccess.compute, token)
    req.session.authTokenNova = token
  }
  return nova
}
