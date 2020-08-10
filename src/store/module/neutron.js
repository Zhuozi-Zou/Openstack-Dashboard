import {
  createNetwork,
  createSubnet,
  deleteNetwork,
  getNetworks,
  getSubnetById,
  updateNetworkById
} from '@/api/neutron'
import { getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getNetworks (params) {
    try {
      const token = await getToken()
      const res = await getNetworks(token)
      return res.data.data.networks
    } catch (e) {
      throw new Error('getNetworks: ' + e)
    }
  },
  async getSubnetById (params, id) {
    try {
      const token = await getToken()
      const res = await getSubnetById(token, id)
      return res.data.data.subnets[0]
    } catch (e) {
      throw new Error('getSubnetById: ' + e)
    }
  },
  async updateNetworkById (params, { id, network }) {
    try {
      const token = await getToken()
      const res = await updateNetworkById(token, id, network)
      return res.data.data.network
    } catch (e) {
      throw new Error('updateNetworkById: ' + e)
    }
  },
  async createNetworkWithSubnet (params, { network, subnet }) {
    try {
      const token = await getToken()
      const resNet = await createNetwork(token, network)
      subnet.network_id = resNet.data.data.network.id
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
      const token = await getToken()
      const resNet = await createNetwork(token, network)
      return resNet.data.data.network
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
    const token = await getToken()
    const res = await createSubnet(token, subnet)
    return res.data.data.subnet
  } catch (e) {
    throw new Error('createSubnetHelper: ' + e)
  }
}

const deleteNetworkHelper = async (id) => {
  try {
    const token = await getToken()
    await deleteNetwork(token, id)
  } catch (e) {
    throw new Error('deleteNetworkHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
