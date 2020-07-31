import axios from './index'

export const getNetworks = (token) => {
  return axios.request({
    url: '/neutron/getNetworks',
    method: 'get',
    params: { token }
  })
}
