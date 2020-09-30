import { getToken } from '@/lib/util'
import { getRouters } from '@/api/neutron/routers'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getRouters () {
    try {
      await getToken()
      const res = await getRouters()
      return res.data
    } catch (e) {
      throw new Error('getRouters: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
