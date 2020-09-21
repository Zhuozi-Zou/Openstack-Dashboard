import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from './lib/bus'
import ViewUI from 'view-design'
import ElCollapse from 'element-ui/lib/collapse'
import ElCollapseItem from 'element-ui/lib/collapse-item'
import './styles/iview-green/index.less'
import 'element-ui/lib/theme-chalk/index.css'

if (process.env.NODE_ENV !== 'production') require('./mock/index')

Vue.config.productionTip = false
Vue.prototype.$bus = bus
Vue.use(ViewUI)
Vue.use(ElCollapse)
Vue.use(ElCollapseItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
