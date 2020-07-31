import axios from './index'

export const getNetworks = token => {
  return axios.request({
    url: '/neutron/getNetworks',
    method: 'get',
    params: { token }
  })
}

export const getSubnetById = (token, id) => {
  return axios.request({
    url: '/neutron/getSubnetById',
    method: 'get',
    params: {
      token,
      id
    }
  })
}

export const updateNetworkById = (token, id, network) => {
  return axios.request({
    url: '/neutron/updateNetworkById',
    method: 'put',
    data: {
      token,
      id,
      network
    }
  })
}
