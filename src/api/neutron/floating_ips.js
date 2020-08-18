import axios from '../index'

export const getFloatingIps = () => {
  return axios.request({
    url: '/neutron/getFloatingIps',
    method: 'get'
  })
}

export const getFloatingIpById = (id) => {
  return axios.request({
    url: '/neutron/getFloatingIpById',
    method: 'get',
    params: { id }
  })
}

export const createFloatingIp = (floatingip) => {
  return axios.request({
    url: '/neutron/createFloatingIp',
    method: 'post',
    data: { floatingip }
  })
}

export const getFloatingIpPools = () => {
  return axios.request({
    url: '/neutron/getFloatingIpPools',
    method: 'get'
  })
}

export const getFloatingIpPorts = (filters) => {
  return axios.request({
    url: '/neutron/getPorts',
    method: 'get',
    params: { filters }
  })
}

export const deleteFloatingIp = (id) => {
  return axios.request({
    url: '/neutron/deleteFloatingIp',
    method: 'delete',
    data: { id }
  })
}

export const disassociateFloatingIp = (ipId) => {
  return axios.request({
    url: '/neutron/disassociateFloatingIp',
    method: 'put',
    data: { ipId }
  })
}

export const associateFloatingIp = (ipId, portId) => {
  return axios.request({
    url: '/neutron/associateFloatingIp',
    method: 'put',
    data: {
      ipId,
      portId
    }
  })
}
