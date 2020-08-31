import {
  createNetwork,
  createSubnet,
  deleteNetwork,
  getNetworks,
  getNetworkById,
  getSubnetById,
  updateNetworkById
} from '@/api/neutron/networks'
import { getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getNetworks () {
    try {
      await getToken()
      const res = await getNetworks()
      return res.data.networks
    } catch (e) {
      throw new Error('getNetworks: ' + e)
    }
  },
  async getNetworkById (params, id) {
    try {
      await getToken()
      const res = await getNetworkById(id)
      return res.data.networks[0]
    } catch (e) {
      throw new Error('getNetworkById: ' + e)
    }
  },
  async getSubnetById (params, id) {
    try {
      await getToken()
      const res = await getSubnetById(id)
      return res.data.subnets[0]
    } catch (e) {
      throw new Error('getSubnetById: ' + e)
    }
  },
  async updateNetworkById (params, { id, network }) {
    try {
      await getToken()
      const res = await updateNetworkById(id, network)
      return res.data.network
    } catch (e) {
      throw new Error('updateNetworkById: ' + e)
    }
  },
  async createNetworkWithSubnet (params, { network, subnet }) {
    try {
      await getToken()
      const resNet = await createNetwork(network)
      subnet.network_id = resNet.data.network.id
      await createSubnetHelper(subnet)
    } catch (e) {
      throw new Error('createNetworkWithSubnet: ' + e)
    }
  },
  async createSubnet (params, subnet) {
    await createSubnetHelper(subnet)
  },
  async createNetwork (params, network) {
    try {
      await getToken()
      const resNet = await createNetwork(network)
      return resNet.data.network
    } catch (e) {
      throw new Error('createNetwork: ' + e)
    }
  },
  async deleteNetworks (params, networks) {
    for (const item of networks) {
      await deleteNetworkHelper(item.id)
    }
  }
}

const createSubnetHelper = async (subnet) => {
  try {
    await getToken()
    const res = await createSubnet(subnet)
    return res.data.subnet
  } catch (e) {
    throw new Error('createSubnetHelper: ' + e)
  }
}

const deleteNetworkHelper = async (id) => {
  try {
    await getToken()
    await deleteNetwork(id)
  } catch (e) {
    throw new Error('deleteNetworkHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
