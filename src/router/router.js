import Layout from '../views/Layout'

export default [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home')
      }
    ]
  },
  {
    path: '/network',
    name: 'Network',
    component: Layout,
    children: [
      {
        path: 'networks',
        name: 'networks',
        component: () => import('../views/Networks')
      },
      {
        path: 'routers',
        name: 'routers',
        component: () => import('../views/Routers')
      },
      {
        path: 'security_groups',
        name: 'security_groups',
        component: () => import('../views/Security_Groups')
      },
      {
        path: 'floating_ips',
        name: 'floating_ips',
        component: () => import('../views/Floating_IPs')
      }
    ]
  },
  {
    path: '/compute',
    name: 'Compute',
    component: Layout,
    children: [
      {
        path: 'instances',
        name: 'instances',
        component: () => import('../views/Instances')
      },
      {
        path: 'images',
        name: 'images',
        component: () => import('../views/Images')
      },
      {
        path: 'key_pairs',
        name: 'key_pairs',
        component: () => import('../views/Key_Pairs')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '*',
    name: 'Error_404',
    component: () => import('../views/Error_404')
  }
]
