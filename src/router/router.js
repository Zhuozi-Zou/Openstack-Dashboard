import Layout from '../views/Layout'

export default [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: () => import('../views/Home'),
        meta: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/network',
    name: 'Network',
    component: Layout,
    meta: {
      title: 'Network'
    },
    children: [
      {
        path: 'networks',
        name: 'Networks',
        component: () => import('../views/Networks'),
        meta: {
          title: 'Networks'
        }
      },
      {
        path: 'routers',
        name: 'Routers',
        component: () => import('../views/Routers'),
        meta: {
          title: 'Routers'
        }
      },
      {
        path: 'security_groups',
        name: 'Security_Groups',
        component: () => import('../views/Security_Groups'),
        meta: {
          title: 'Security Groups'
        }
      },
      {
        path: 'floating_ips',
        name: 'Floating_Ips',
        component: () => import('../views/Floating_IPs'),
        meta: {
          title: 'Floating IPs'
        }
      }
    ]
  },
  {
    path: '/compute',
    name: 'Compute',
    component: Layout,
    meta: {
      title: 'Compute'
    },
    children: [
      {
        path: 'instances',
        name: 'Instances',
        component: () => import('../views/Instances'),
        meta: {
          title: 'Instances'
        }
      },
      {
        path: 'images',
        name: 'Images',
        component: () => import('../views/Images'),
        meta: {
          title: 'Images'
        }
      },
      {
        path: 'key_pairs',
        name: 'Key_Pairs',
        component: () => import('../views/Key_Pairs'),
        meta: {
          title: 'Key Pairs'
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    meta: {
      title: 'Admin'
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../views/Overview'),
        meta: {
          title: 'Overview'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '*',
    name: 'Error_404',
    component: () => import('@/views/Error_404'),
    meta: {
      title: '404'
    }
  }
]

// export const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/Login')
//   },
//   {
//     path: '*',
//     name: 'Error_404',
//     component: () => import('@/views/Error_404')
//   }
// ]
