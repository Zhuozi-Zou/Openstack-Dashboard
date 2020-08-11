import { getToken } from '@/lib/util'
import { getFloatingIps } from '@/api/neutron/floating_ips'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getFloatingIps () {
    try {
      const token = await getToken()
      const res = await getFloatingIps(token)
      return res.data
    } catch (e) {
      throw new Error('getFloatingIps: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
