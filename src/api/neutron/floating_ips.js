import axios from '../index'

export const getFloatingIps = token => {
  return axios.request({
    url: '/neutron/getFloatingIps',
    method: 'get',
    params: { token }
  })
}
