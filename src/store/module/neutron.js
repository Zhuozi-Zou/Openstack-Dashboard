import { getNetworks, getSubnetById } from '@/api/neutron'
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
      console.log(e)
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
      console.log(e)
    }
  },
  updateNetworkById (params, id, network) {
    //
  }
}

export default {
  state,
  mutations,
  actions
}
