import axios from './index'

export const getAdminToken = () => {
  return axios.request({
    url: '/keystone/auth/getAdminToken',
    method: 'get'
  })
}
