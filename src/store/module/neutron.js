import { getNetworks } from '@/api/neutron'
import { getToken, getNewToken } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getNetworks () {
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
  }
}

export default {
  state,
  mutations,
  actions
}
