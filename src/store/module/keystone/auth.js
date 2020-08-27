import { getAdminToken } from '@/api/keystone/auth'
import { setTokenToCookie } from '@/lib/util'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getAdminToken () {
    console.log('getAdminToken called')
    try {
      const res = await getAdminToken()
      setTokenToCookie(res.data.token)
      return res
    } catch (e) {
      throw new Error('getAdminToken: ' + e)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
