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
        name: 'networks',
        component: () => import('../views/Networks'),
        meta: {
          title: 'Networks'
        }
      },
      {
        path: 'routers',
        name: 'routers',
        component: () => import('../views/Routers'),
        meta: {
          title: 'Routers'
        }
      },
      {
        path: 'security_groups',
        name: 'security_groups',
        component: () => import('../views/Security_Groups'),
        meta: {
          title: 'Security Groups'
        }
      },
      {
        path: 'floating_ips',
        name: 'floating_ips',
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
        name: 'instances',
        component: () => import('../views/Instances'),
        meta: {
          title: 'Instances'
        }
      },
      {
        path: 'images',
        name: 'images',
        component: () => import('../views/Images'),
        meta: {
          title: 'Images'
        }
      },
      {
        path: 'key_pairs',
        name: 'key_pairs',
        component: () => import('../views/Key_Pairs'),
        meta: {
          title: 'Key Pairs'
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
