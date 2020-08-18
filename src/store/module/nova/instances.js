import { getToken } from '@/lib/util'
import { getInstanceById, getInstances } from '@/api/nova/instances'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getInstanceById (params, id) {
    try {
      const token = await getToken()
      const res = await getInstanceById(token, id)
      return res.data
    } catch (e) {
      throw new Error('getInstanceById: ' + e)
    }
  },
  async getInstances () {
    try {
      const token = await getToken()
      const res = await getInstances(token)
      return res.data
    } catch (e) {
      throw new Error('getInstances: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
