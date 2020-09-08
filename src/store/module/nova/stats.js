import { getUsageByProjectId, getQuotaByProjectId } from '@/api/nova/stats'
import { getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getUsageByProjectId (params, { id, start, end }) {
    try {
      await getToken()
      const res = await getUsageByProjectId(id, start, end)
      return res.data.tenant_usage
    } catch (e) {
      throw new Error('getUsageByProjectId: ' + e)
    }
  },
  async getQuotaByProjectId (params, id) {
    try {
      await getToken()
      const res = await getQuotaByProjectId(id)
      return res.data
    } catch (e) {
      throw new Error('getQuotaByProjectId: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
