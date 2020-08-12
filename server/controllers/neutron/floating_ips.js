const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')

let neutron = ''

const initNeutron = (req, token) => {
  const authToken = req.session.authTokenNeutron
  if (!authToken || authToken !== token) {
    console.log('=====AuthToken renewed=====')
    neutron = new osWrap.Neutron(apiAccess.network, token)
    req.session.authTokenNeutron = token
  }
}

exports.getFloatingIps = (req, res) => {
  const token = req.query.token
  if (!token) res.status(401).send()
  else {
    initNeutron(req, token)
    neutron.listFloatingIps({}, (error, ipArray) => {
      if (error) {
        res.status(error.detail.remoteStatusCode).send(error)
      } else {
        res.send(ipArray)
      }
    })
  }
}
