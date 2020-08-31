import Layout from '../views/Layout'
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
            path: 'instances',
            name: 'Instances',
            component: () => import('../views/Instances'),
            meta: {
              title: 'Instances',
              icon: 'md-desktop'
            }
          },
          {
            path: 'images',
            name: 'Images',
            component: () => import('../views/Images'),
            meta: {
              title: 'Images',
              icon: 'md-copy'
            }
          },
          {
            path: 'key_pairs',
            name: 'Key_Pairs',
            component: () => import('../views/Key_Pairs'),
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
            component: () => import('../views/Networks'),
            meta: {
              title: 'Networks',
              icon: 'md-pulse'
            }
          },
          {
            path: 'routers',
            name: 'Routers',
            component: () => import('../views/Routers'),
            meta: {
              title: 'Routers',
              icon: 'md-shuffle'
            }
          },
          {
            path: 'security_groups',
            name: 'Security_Groups',
            component: () => import('../views/Security_Groups'),
            meta: {
              title: 'Security Groups',
              icon: 'md-lock'
            }
          },
          {
            path: 'floating_ips',
            name: 'Floating_Ips',
            component: () => import('../views/Floating_IPs'),
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
        path: 'overview',
        name: 'Overview',
        component: () => import('../views/Overview'),
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
    name: 'Error_404',
    component: () => import('@/views/Error_404')
  }
]
