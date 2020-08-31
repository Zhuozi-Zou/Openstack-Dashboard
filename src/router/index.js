import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, getTokenFromCookie } from '@/lib/util'

Vue.use(Router)

// export default new Router({
//   mode: "history",
//   routes
// });

const router = new Router({
  routes
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(async (to, from, next) => {
  to.meta && setTitle(to.meta.title)
  if (to.name === 'Login') next()
  else {
    if (!getTokenFromCookie('login')) next({ name: 'Login' })
    else {
      if (store.state.router.hasGetRules) next()
      else {
        try {
          const rules = await store.dispatch('authorization')
          const routers = await store.dispatch('concatRoutes', rules)
          router.addRoutes(routers)
          next({ ...to, replace: true })
        } catch (e) {
          next({ name: 'Login' })
        }
      }
    }
  }
})

export default router
