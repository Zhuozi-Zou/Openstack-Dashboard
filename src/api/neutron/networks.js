import axios from '../index'

export const getNetworks = () => {
  return axios.request({
    url: '/neutron/getNetworks',
    method: 'get'
  })
}

export const getNetworkById = (id) => {
  return axios.request({
    url: '/neutron/getNetworkById',
    method: 'get',
    params: { id }
  })
}

export const getSubnetById = (id) => {
  return axios.request({
    url: '/neutron/getSubnetById',
    method: 'get',
    params: { id }
  })
}

export const updateNetworkById = (id, network) => {
  return axios.request({
    url: '/neutron/updateNetworkById',
    method: 'put',
    data: {
      id,
      network
    }
  })
}

export const createNetwork = (network) => {
  return axios.request({
    url: '/neutron/createNetwork',
    method: 'post',
    data: { network }
  })
}

export const createSubnet = (subnet) => {
  return axios.request({
    url: '/neutron/createSubnet',
    method: 'post',
    data: { subnet }
  })
}

export const deleteNetwork = (id) => {
  return axios.request({
    url: '/neutron/deleteNetwork',
    method: 'delete',
    data: { id }
  })
}
