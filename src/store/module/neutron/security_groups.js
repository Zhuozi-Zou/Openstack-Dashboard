import { getToken } from '@/lib/util'
import { getSecurityGroupById } from '@/api/neutron/security_groups'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getSecurityGroupById (params, id) {
    try {
      await getToken()
      const res = await getSecurityGroupById(id)
      return res.data
    } catch (e) {
      throw new Error('getSecurityGroupById: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
