import { createNetwork, createSubnet, getNetworks, getSubnetById, updateNetworkById, deleteNetwork } from '@/api/neutron'
import { getNewToken, getToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getNetworks (params) {
    const token = await getToken()
    try {
      const res = await getNetworks(token)
      if (res.data.code === 200) return res.data.data.networks
      if (res.data.code === 401) {
        console.log('token expired, requesting a new one...')
        const newRes = await getNetworks(await getNewToken())
        return newRes.data.data.networks
      }
    } catch (e) {
      console.log('getNetworks: ' + e)
    }
  },
  async getSubnetById (params, id) {
    const token = await getToken()
    try {
      const res = await getSubnetById(token, id)
      if (res.data.code === 200) return res.data.data.subnets[0]
      if (res.data.code === 401) {
        console.log('token expired, requesting a new one...')
        const newRes = await getSubnetById(await getNewToken(), id)
        return newRes.data.data.subnets[0]
      }
    } catch (e) {
      console.log('getSubnetById: ' + e)
    }
  },
  async updateNetworkById (params, { id, network }) {
    const token = await getToken()
    try {
      const res = await updateNetworkById(token, id, network)
      if (res.data.code === 200) return res.data.data.network
      if (res.data.code === 401) {
        console.log('token expired, requesting a new one...')
        const newRes = await updateNetworkById(await getNewToken(), id, network)
        return newRes.data.data.network
      }
    } catch (e) {
      console.log('updateNetworkById: ' + e)
    }
  },
  async createNetworkWithSubnet (params, { network, subnet }) {
    const token = await getToken()
    try {
      const resNet = await createNetwork(token, network)
      if (resNet.data.code === 201) {
        subnet.network_id = resNet.data.data.network.id
        await createSubnetHelper(subnet)
      } else if (resNet.data.code === 401) {
        console.log('token expired, requesting a new one...')
        const newResNet = await createNetwork(await getNewToken(), network)
        subnet.network_id = newResNet.data.data.network.id
        await createSubnetHelper(subnet)
      }
    } catch (e) {
      console.log('createNetworkWithSubnet: ' + e)
    }
  },
  async createSubnet (params, subnet) {
    await createSubnetHelper(subnet)
  },
  async createNetwork (params, network) {
    const token = await getToken()
    try {
      const resNet = await createNetwork(token, network)
      if (resNet.data.code === 200) {
        return resNet.data.data.network
      }
      if (resNet.data.code === 401) {
        console.log('token expired, requesting a new one...')
        const newResNet = await createNetwork(await getNewToken(), network)
        return newResNet.data.data.network
      }
    } catch (e) {
      console.log('createNetwork: ' + e)
    }
  },
  async deleteNetworks (params, networks) {
    for (const item of networks) {
      await deleteNetworkHelper(item.id)
    }
  }
}

const createSubnetHelper = async (subnet) => {
  const token = await getToken()
  try {
    const res = await createSubnet(token, subnet)
    if (res.data.code === 201) {
      return res.data.data.subnet
    }
    if (res.data.code === 401) {
      console.log('token expired, requesting a new one...')
      const newRes = await createSubnet(await getNewToken(), subnet)
      return newRes.data.data.subnet
    }
  } catch (e) {
    console.log('createSubnetHelper: ' + e)
  }
}

const deleteNetworkHelper = async (id) => {
  const token = await getToken()
  try {
    const res = await deleteNetwork(token, id)
    if (res.data.code === 401) {
      console.log('token expired, requesting a new one...')
      await createSubnet(await getNewToken(), id)
    }
  } catch (e) {
    console.log('deleteNetworkHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
