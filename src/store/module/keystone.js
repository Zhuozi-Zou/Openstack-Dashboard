import { getAdminToken } from '@/api/keystone'
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
    const res = await getAdminToken()
    if (res.status === 201) {
      setTokenToCookie(res.data)
      return res
    } else {
      console.log(new Error('getAdminToken error'))
    }
  }
}

export default {
  state,
  mutations,
  actions
}
