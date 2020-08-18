const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')
const { callBack } = require('../../lib/util')

let nova = ''

const initNova = (req, token) => {
  const authToken = req.session.authTokenNova
  if (!authToken || authToken !== token) {
    console.log('=====authTokenNova renewed=====')
    nova = new osWrap.Nova(apiAccess.compute, token)
    req.session.authTokenNova = token
  }
}

exports.getInstanceById = (req, res) => {
  const { token, id } = req.query
  if (!token) res.status(401).send()
  else if (!id) res.status(400).send()
  else {
    initNova(req, token)
    nova.getServer(id, callBack(res))
  }
}

exports.getInstances = (req, res) => {
  const { token } = req.query
  if (!token) res.status(401).send()
  else {
    initNova(req, token)
    nova.listServers({}, callBack(res))
  }
}
