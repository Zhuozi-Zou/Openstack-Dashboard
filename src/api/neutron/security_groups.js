import axois from '@/api'

export const getSecurityGroupById = (id) => {
  return axois.request({
    url: '/neutron/getSecurityGroupById',
    method: 'get',
    params: { id }
  })
}
