import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import saveInLocal from './plugin/saveInLocal'
import user from './module/user'
import neutron from './module/neutron'
import keystone from './module/keystone'
import nova from './module/nova'
import glance from './module/glance'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state,
  mutations,
  actions,
  modules: {
    user,
    networks: neutron.networks,
    floatingIps: neutron.floatingIps,
    auth: keystone.auth,
    instances: nova.instances,
    flavors: nova.flavors,
    images: glance.images
  },
  plugins: [saveInLocal]
})
