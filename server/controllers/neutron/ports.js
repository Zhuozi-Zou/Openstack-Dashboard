const { callBack } = require('../../lib/util')
const { initNeutron } = require('./index')

exports.getPortById = (req, res) => {
  const { id } = req.query
  if (!id) res.status(400).send()
  else {
    const neutron = initNeutron(req)
    neutron.getPort(id, callBack(res))
  }
}

exports.listPorts = (req, res) => {
  const { filters } = req.query
  if (!filters) res.status(400).send()
  else {
    const filtersObj = JSON.parse(filters)
    const neutron = initNeutron(req)
    neutron.listPorts({ filters: filtersObj }, callBack(res))
  }
}
