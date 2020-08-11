import axios from '../index'

export const getAdminToken = () => {
  return axios.request({
    url: '/keystone/getAdminToken',
    method: 'get'
  })
}
