import axios from '@/api'

export const getUsageByProjectId = (id, start = '', end = '') => {
  const params = { id }
  if (start) {
    params.start = start
    if (end) params.end = end
  }

  return axios.request({
    url: '/nova/getUsageByProjectId',
    method: 'get',
    params
  })
}

export const getQuotaByProjectId = (id) => {
  return axios.request({
    url: '/nova/getQuotaByProjectId',
    method: 'get',
    params: { id }
  })
}
