import Layout from '@/views/Layout'
import Navigator from '@/views/Navigator'

export const routerMap = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home'),
        meta: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    component: Layout,
    meta: {
      title: 'Project',
      icon: 'md-filing'
    },
    children: [
      {
        path: '/compute',
        name: 'compute',
        component: Navigator,
        meta: {
          title: 'Compute',
          icon: 'md-analytics'
        },
        children: [
          {
            path: 'compute_overview',
            name: 'compute_overview',
            component: () => import(/* webpackChunkname: "compute_overview" */ '../views/Compute_Overview'),
            meta: {
              title: 'Overview',
              icon: 'md-book'
            }
          },
          {
            path: 'instances',
            name: 'instances',
            component: () => import(/* webpackChunkName: "instances" */ '../views/Instances'),
            meta: {
              title: 'Instances',
              icon: 'md-desktop'
            }
          },
          {
            path: 'images',
            name: 'images',
            component: () => import(/* webpackChunkName: "images" */ '../views/Images'),
            meta: {
              title: 'Images',
              icon: 'md-copy'
            }
          },
          {
            path: 'key_pairs',
            name: 'key_pairs',
            component: () => import(/* webpackChunkName: "key_pairs" */ '../views/Key_Pairs'),
            meta: {
              title: 'Key Pairs',
              icon: 'md-key'
            }
          }
        ]
      },
      {
        path: '/network',
        name: 'network',
        component: Navigator,
        meta: {
          title: 'Network',
          icon: 'md-globe'
        },
        children: [
          {
            path: 'networks',
            name: 'networks',
            component: () => import(/* webpackChunkName: "networks" */ '../views/Networks'),
            meta: {
              title: 'Networks',
              icon: 'md-pulse'
            }
          },
          {
            path: 'routers',
            name: 'routers',
            component: () => import(/* webpackChunkName: "routers" */ '../views/Routers'),
            meta: {
              title: 'Routers',
              icon: 'md-shuffle'
            }
          },
          {
            path: 'security_groups',
            name: 'security_groups',
            component: () => import(/* webpackChunkName: "security_groups" */ '../views/Security_Groups'),
            meta: {
              title: 'Security Groups',
              icon: 'md-lock'
            }
          },
          {
            path: 'floating_ips',
            name: 'floating_ips',
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
    name: 'admin',
    component: Layout,
    meta: {
      title: 'Admin',
      icon: 'md-person'
    },
    children: [
      {
        path: 'admin_overview',
        name: 'admin_overview',
        component: () => import(/* webpackChunkName: "admin_overview" */ '../views/Admin_Overview'),
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
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "error_404" */ '@/views/Error_404')
  }
]
