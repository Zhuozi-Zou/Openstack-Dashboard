import axois from '@/api'

export const getRouters = () => {
  return axois.request({
    url: '/neutron/getRouters',
    method: 'get'
  })
}
