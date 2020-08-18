import { getToken } from '@/lib/util'
import {
  associateFloatingIp,
  createFloatingIp,
  deleteFloatingIp,
  disassociateFloatingIp,
  getFloatingIpPools,
  getFloatingIpPorts,
  getFloatingIps,
  getFloatingIpById
} from '@/api/neutron/floating_ips'

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
  async getFloatingIpById (params, id) {
    try {
      const token = await getToken()
      const res = await getFloatingIpById(token, id)
      return res.data
    } catch (e) {
      throw new Error('getFloatingIpById: ' + e)
    }
  },
  async createFloatingIp (params, floatingip) {
    try {
      const token = await getToken()
      const res = await createFloatingIp(token, floatingip)
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
  },
  async getFloatingIpPorts () {
    try {
      const token = await getToken()
      const res = await getFloatingIpPorts(token, { device_owner: 'compute:nova' })
      return res.data
    } catch (e) {
      throw new Error('getFloatingIpPorts: ' + e)
    }
  },
  async deleteFloatingIps (params, floatingIps) {
    for (const item of floatingIps) {
      await deleteFloatingIpHelper(item.id)
    }
  },
  async disassociateFloatingIp (params, ipId) {
    try {
      const token = await getToken()
      const res = await disassociateFloatingIp(token, ipId)
      return res.data
    } catch (e) {
      throw new Error('disassociateFloatingIp: ' + e)
    }
  },
  async associateFloatingIp (params, { ipId, portId }) {
    try {
      const token = await getToken()
      const res = await associateFloatingIp(token, ipId, portId)
      return res.data
    } catch (e) {
      throw new Error('associateFloatingIp: ' + e)
    }
  }
}

const deleteFloatingIpHelper = async (id) => {
  try {
    const token = await getToken()
    await deleteFloatingIp(token, id)
  } catch (e) {
    throw new Error('deleteFloatingIpHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
