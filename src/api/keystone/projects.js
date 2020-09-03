import axois from '@/api'

export const getProjectById = id => {
  return axois.request({
    url: '/keystone/getProjectById',
    method: 'get',
    params: { id }
  })
}
