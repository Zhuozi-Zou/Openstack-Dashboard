import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import router from './module/router'
import user from './module/user'
import neutron from './module/neutron'
import keystone from './module/keystone'
import nova from './module/nova'
import glance from './module/glance'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV === 'development',
  strict: false,
  state,
  mutations,
  actions,
  modules: {
    router,
    user,
    networks: neutron.networks,
    floatingIps: neutron.floatingIps,
    statsNeutron: neutron.stats,
    routers: neutron.routers,
    ports: neutron.ports,
    securityGroups: neutron.securityGroups,
    auth: keystone.auth,
    projects: keystone.projects,
    instances: nova.instances,
    flavors: nova.flavors,
    statsNova: nova.stats,
    images: glance.images
  }
})
