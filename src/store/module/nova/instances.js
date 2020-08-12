import { getToken } from '@/lib/util'
import { getInstanceById } from '@/api/nova/instances'

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
  }
}

export default {
  state,
  mutations,
  actions
}
