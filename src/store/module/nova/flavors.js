import { getToken } from '@/lib/util'
import { getFlavorById } from '@/api/nova/flavors'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getFlavorById (params, id) {
    try {
      await getToken()
      const res = await getFlavorById(id)
      return res.data
    } catch (e) {
      throw new Error('getFlavorById: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
