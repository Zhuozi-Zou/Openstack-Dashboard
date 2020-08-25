const { apiAccess } = require('../../config')
const osWrap = require('openstack-wrapper')
const jwt = require('jsonwebtoken')

let glance = ''

const getNewGlance = (token, req) => {
  console.log('=====authTokenGlance renewed=====')
  glance = new osWrap.Glance(apiAccess.image, token)
  req.session.authTokenGlance = token
}

exports.initGlance = (req) => {
  const authToken = req.session.authTokenGlance
  jwt.verify(authToken, 'openstack token', (error, decode) => {
    if (error) {
      getNewGlance(req.token, req)
    }
  })
  return glance
}
