import { getToken } from '@/lib/util'
import { getFloatingIps, createFloatingIp, getFloatingIpPools } from '@/api/neutron/floating_ips'

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
  },
  async createFloatingIp (id) {
    try {
      const token = await getToken()
      const res = await createFloatingIp(token, id)
      return res.data
    } catch (e) {
      throw new Error('createFloatingIp: ' + e)
    }
  },
  async getFloatingIpPools () {
    try {
      const token = await getToken()
      const res = await getFloatingIpPools(token)
      return res.data.data.floatingip_pools
    } catch (e) {
      throw new Error('getFloatingIpPools: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
