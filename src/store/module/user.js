import { setTokenToCookie } from '@/lib/util'
import { login } from '@/api/user'

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
      await loginView.$router.push({ name: 'Home' })
    } catch (e) {
      loginView.$Message.error('Invalid user name or password')
      throw new Error('login: ' + e)
    }
  },
  authorization ({ commit }, token) {
    // return new Promise((resolve, reject) => {
    //   authorization().then(res => {
    //     if (parseInt(res.code) === 401) {
    //       reject(new Error('token error'))
    //     } else {
    //       setToken(res.data.token)
    //       resolve(res.data.rules.page)
    //       commit('SET_RULES', res.data.rules.component)
    //     }
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  }
}

export default {
  state,
  mutations,
  actions
}
