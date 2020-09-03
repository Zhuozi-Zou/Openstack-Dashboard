import { getProjectById } from '@/api/keystone/projects'
import { getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getProjectById (params, id) {
    try {
      await getToken()
      const res = await getProjectById(id)
      return res.data.project
    } catch (e) {
      throw new Error('getProjectById: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
