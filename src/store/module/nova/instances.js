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
      await getToken()
      const res = await getInstanceById(id)
      return res.data
    } catch (e) {
      throw new Error('getInstanceById: ' + e)
    }
  },
  async getInstances () {
    try {
      await getToken()
      const res = await getInstances()
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
