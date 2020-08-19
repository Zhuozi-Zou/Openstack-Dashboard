const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')
const jwt = require('jsonwebtoken')

let nova = ''

const getNewNova = (token, req) => {
  console.log('=====authTokenNova renewed=====')
  nova = new osWrap.Nova(apiAccess.compute, token)
  req.session.authTokenNova = token
}

exports.initNova = (req) => {
  const authToken = req.session.authTokenNova
  jwt.verify(authToken, 'openstack token', (error, decode) => {
    if (error) {
      getNewNova(req.token, req)
    }
  })
  return nova
}
