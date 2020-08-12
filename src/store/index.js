import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import saveInLocal from './plugin/saveInLocal'
import neutron from './module/neutron'
import keystone from './module/keystone'
import nova from './module/nova'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions,
  modules: {
    networks: neutron.networks,
    floatingIps: neutron.floatingIps,
    auth: keystone.auth,
    instances: nova.instances
  },
  plugins: [saveInLocal]
})
