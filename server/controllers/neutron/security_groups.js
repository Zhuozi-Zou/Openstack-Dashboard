const { callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getSecurityGroupById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.getSecurityGroup(id, callBack(res))
  }
}
