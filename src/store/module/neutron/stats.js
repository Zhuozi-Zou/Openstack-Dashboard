import { getQuotaDetailsByProjectId } from '@/api/neutron/stats'
import { getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getQuotaDetailsByProjectId (params, id) {
    try {
      await getToken()
      const res = await getQuotaDetailsByProjectId(id)
      return res.data.quota
    } catch (e) {
      throw new Error('getQuotaDetailsByProjectId: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
