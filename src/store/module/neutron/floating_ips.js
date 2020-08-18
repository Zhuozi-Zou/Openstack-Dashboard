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
      await getToken()
      const res = await getFloatingIps()
      return res.data
    } catch (e) {
      throw new Error('getFloatingIps: ' + e)
    }
  },
  async getFloatingIpById (params, id) {
    try {
      await getToken()
      const res = await getFloatingIpById(id)
      return res.data
    } catch (e) {
      throw new Error('getFloatingIpById: ' + e)
    }
  },
  async createFloatingIp (params, floatingip) {
    try {
      await getToken()
      const res = await createFloatingIp(floatingip)
      return res.data
    } catch (e) {
      throw new Error('createFloatingIp: ' + e)
    }
  },
  async getFloatingIpPools () {
    try {
      await getToken()
      const res = await getFloatingIpPools()
      return res.data.data.floatingip_pools
    } catch (e) {
      throw new Error('getFloatingIpPools: ' + e)
    }
  },
  async getFloatingIpPorts () {
    try {
      await getToken()
      const res = await getFloatingIpPorts({ device_owner: 'compute:nova' })
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
      await getToken()
      const res = await disassociateFloatingIp(ipId)
      return res.data
    } catch (e) {
      throw new Error('disassociateFloatingIp: ' + e)
    }
  },
  async associateFloatingIp (params, { ipId, portId }) {
    try {
      await getToken()
      const res = await associateFloatingIp(ipId, portId)
      return res.data
    } catch (e) {
      throw new Error('associateFloatingIp: ' + e)
    }
  }
}

const deleteFloatingIpHelper = async (id) => {
  try {
    await getToken()
    await deleteFloatingIp(id)
  } catch (e) {
    throw new Error('deleteFloatingIpHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
