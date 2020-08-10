import { getAdminToken } from '@/api/keystone'
import { setTokenToCookie } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getAdminToken (params) {
    console.log('getAdminToken called')
    try {
      const res = await getAdminToken()
      setTokenToCookie(res.data)
      return res
    } catch (e) {
      console.log('getAdminToken: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
