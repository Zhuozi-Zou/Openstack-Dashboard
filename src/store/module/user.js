import { setTokenToCookie } from '@/lib/util'
import { login, authorization } from '@/api/user'

const state = {
  userName: '',
  rules: {}
}

const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  },
  SET_RULES (state, rules) {
    state.rules = rules
  }
}

const actions = {
  async login ({ commit }, { userName, password, loginView }) {
    try {
      const res = await login({ userName, password })
      setTokenToCookie(res.data.token, 'login')
      await loginView.$router.push({ name: 'home' })
    } catch (e) {
      loginView.$Message.error('Invalid user name or password')
      throw new Error('login: ' + e)
    }
  },
  async authorization ({ commit }) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        setTokenToCookie(res.data.token, 'login')
        resolve(res.data.rules.page)
        commit('SET_RULES', res.data.rules.component)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
