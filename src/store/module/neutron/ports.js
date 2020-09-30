import { getToken } from '@/lib/util'
import { getPortById, listPorts } from '@/api/neutron/ports'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getPortById (params, id) {
    try {
      await getToken()
      const res = await getPortById(id)
      return res.data
    } catch (e) {
      throw new Error('getPortById: ' + e)
    }
  },
  async listPorts (params, filters) {
    try {
      await getToken()
      const res = await listPorts(filters)
      return res.data
    } catch (e) {
      throw new Error('listPorts: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
