import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import saveInLocal from './plugin/saveInLocal'
import neutron from './module/neutron'
import keystone from './module/keystone'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions,
  modules: {
    neutron,
    keystone
  },
  plugins: [saveInLocal]
})
