import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { setTitle, getTokenFromCookie, setTokenToCookie } from '@/lib/util'

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

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  const token = getTokenFromCookie('login')

  if (token) {
    next()
    // if (!store.state.router.hasGetRules) {
    //   store.dispatch('authorization').then(rules => {
    //     store.dispatch('concatRoutes', rules).then(routers => {
    //       router.addRoutes(routers)
    //       next({ ...to, replace: true })
    //     }).catch(() => {
    //       next({ name: 'Login' })
    //     })
    //   }).catch(() => {
    //     setTokenToCookie('', 'login')
    //     next({ name: 'Login' })
    //   })
    // } else {
    //   next()
    // }
  } else {
    if (to.name === 'Login') next()
    else next({ name: 'Login' })
  }
})

export default router
