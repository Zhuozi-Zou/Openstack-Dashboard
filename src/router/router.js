import Layout from '@/views/Layout'
import Navigator from '@/views/Navigator'

export const routerMap = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/project',
    name: 'Project',
    component: Layout,
    meta: {
      title: 'Project',
      icon: 'md-filing'
    },
    children: [
      {
        path: '/compute',
        name: 'Compute',
        component: Navigator,
        meta: {
          title: 'Compute',
          icon: 'md-analytics'
        },
        children: [
          {
            path: 'compute_overview',
            name: 'Compute_Overview',
            component: () => import(/* webpackChunkname: "Compute_Overview" */ '../views/Compute_Overview'),
            meta: {
              title: 'Overview',
              icon: 'md-book'
            }
          },
          {
            path: 'instances',
            name: 'Instances',
            component: () => import(/* webpackChunkName: "Instances" */ '../views/Instances'),
            meta: {
              title: 'Instances',
              icon: 'md-desktop'
            }
          },
          {
            path: 'images',
            name: 'Images',
            component: () => import(/* webpackChunkName: "Images" */ '../views/Images'),
            meta: {
              title: 'Images',
              icon: 'md-copy'
            }
          },
          {
            path: 'key_pairs',
            name: 'Key_Pairs',
            component: () => import(/* webpackChunkName: "Key_Pairs" */ '../views/Key_Pairs'),
            meta: {
              title: 'Key Pairs',
              icon: 'md-key'
            }
          }
        ]
      },
      {
        path: '/network',
        name: 'Network',
        component: Navigator,
        meta: {
          title: 'Network',
          icon: 'md-globe'
        },
        children: [
          {
            path: 'networks',
            name: 'Networks',
            component: () => import(/* webpackChunkName: "Networks" */ '../views/Networks'),
            meta: {
              title: 'Networks',
              icon: 'md-pulse'
            }
          },
          {
            path: 'routers',
            name: 'Routers',
            component: () => import(/* webpackChunkName: "Routers" */ '../views/Routers'),
            meta: {
              title: 'Routers',
              icon: 'md-shuffle'
            }
          },
          {
            path: 'security_groups',
            name: 'Security_Groups',
            component: () => import(/* webpackChunkName: "Security_Groups" */ '../views/Security_Groups'),
            meta: {
              title: 'Security Groups',
              icon: 'md-lock'
            }
          },
          {
            path: 'floating_ips',
            name: 'Floating_Ips',
            component: () => import(/* webpackChunkName: "Floating_IPs" */ '../views/Floating_IPs'),
            meta: {
              title: 'Floating IPs',
              icon: 'md-locate'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    meta: {
      title: 'Admin',
      icon: 'md-person'
    },
    children: [
      {
        path: 'admin_overview',
        name: 'Admin_Overview',
        component: () => import(/* webpackChunkName: "Admin_Overview" */ '../views/Admin_Overview'),
        meta: {
          title: 'Overview',
          icon: 'md-map'
        }
      }
    ]
  }
]

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "Error_404" */ '@/views/Error_404')
  }
]
