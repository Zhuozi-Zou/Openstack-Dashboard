import axois from '@/api'

export const getQuotaDetailsByProjectId = (id) => {
  return axois.request({
    url: '/neutron/getQuotaDetailsByProjectId',
    method: 'get',
    params: { id }
  })
}
