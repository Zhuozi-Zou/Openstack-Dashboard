import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from './lib/bus'
import iview from 'iview'
import { Spin } from 'ant-design-vue'
import 'iview/dist/styles/iview.css'
import 'ant-design-vue/dist/antd.css'

if (process.env.NODE_ENV !== 'production') require('./mock/index')

Vue.config.productionTip = false
Vue.prototype.$bus = bus
Vue.use(iview)
Vue.use(Spin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
