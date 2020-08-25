import { getToken } from '@/lib/util'
import { getInstanceById, getInstances } from '@/api/nova/instances'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getInstanceById (params, id) {
    try {
      await getToken()
      const res = await getInstanceById(id)
      return res.data
    } catch (e) {
      throw new Error('getInstanceById: ' + e)
    }
  },
  async getInstances () {
    try {
      await getToken()
      const res = await getInstances()
      return res.data
    } catch (e) {
      throw new Error('getInstances: ' + e)
    }
  },
  getPowerStateStr (params, stateNum) {
    switch (stateNum) {
      case 0:
        return 'No State'
      case 1:
        return 'Running'
      case 3:
        return 'Paused'
      case 4:
        return 'Shut Down'
      case 6:
        return 'Crashed'
      case 7:
        return 'Suspended'
    }
  }
}

export default {
  state,
  mutations,
  actions
}
