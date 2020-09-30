const { callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getRouters = (req, res) => {
  const neutron = initNeutron(req)
  neutron.listRouters(callBack(res))
}
