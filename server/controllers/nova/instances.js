const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')

let nova = ''

const initNova = (req, token) => {
  const authToken = req.session.authTokenNova
  if (!authToken || authToken !== token) {
    console.log('=====AuthToken renewed=====')
    nova = new osWrap.Nova(apiAccess.compute, token)
    req.session.authTokenNova = token
  }
}

exports.getInstanceById = (req, res) => {
  console.log(req.query)
  const { token, id } = req.query
  if (!token) res.status(401).send()
  else if (!id) res.status(400).send()
  else {
    initNova(req, token)
    nova.getServer(id, (error, server) => {
      if (error) {
        res.status(error.detail.remoteStatusCode).send(error)
      } else {
        res.send(server)
      }
    })
  }
}
