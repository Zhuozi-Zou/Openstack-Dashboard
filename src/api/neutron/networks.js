import axios from '../index'

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

export const createNetwork = (token, network) => {
  return axios.request({
    url: '/neutron/createNetwork',
    method: 'post',
    data: {
      token,
      network
    }
  })
}

export const createSubnet = (token, subnet) => {
  return axios.request({
    url: '/neutron/createSubnet',
    method: 'post',
    data: {
      token,
      subnet
    }
  })
}

export const deleteNetwork = (token, id) => {
  return axios.request({
    url: '/neutron/deleteNetwork',
    method: 'delete',
    data: {
      token,
      id
    }
  })
}
