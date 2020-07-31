import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

// export default new Router({
//   mode: "history",
//   routes
// });

const router = new Router({
  routes
})

const HAS_LOGGED_IN = true

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    if (HAS_LOGGED_IN) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    if (HAS_LOGGED_IN) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router
