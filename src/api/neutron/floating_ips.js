import axios from '../index'

export const getFloatingIps = token => {
  return axios.request({
    url: '/neutron/getFloatingIps',
    method: 'get',
    params: { token }
  })
}

export const getFloatingIpById = (token, id) => {
  return axios.request({
    url: '/neutron/getFloatingIpById',
    method: 'get',
    params: { token, id }
  })
}

export const createFloatingIp = (token, floatingip) => {
  return axios.request({
    url: '/neutron/createFloatingIp',
    method: 'post',
    data: { token, floatingip }
  })
}

export const getFloatingIpPools = token => {
  return axios.request({
    url: '/neutron/getFloatingIpPools',
    method: 'get',
    params: { token }
  })
}

export const getFloatingIpPorts = (token, filters) => {
  return axios.request({
    url: '/neutron/getPorts',
    method: 'get',
    params: { token, filters }
  })
}

export const deleteFloatingIp = (token, id) => {
  return axios.request({
    url: '/neutron/deleteFloatingIp',
    method: 'delete',
    data: {
      token,
      id
    }
  })
}

export const disassociateFloatingIp = (token, ipId) => {
  return axios.request({
    url: '/neutron/disassociateFloatingIp',
    method: 'put',
    data: { token, ipId }
  })
}

export const associateFloatingIp = (token, ipId, portId) => {
  return axios.request({
    url: '/neutron/associateFloatingIp',
    method: 'put',
    data: { token, ipId, portId }
  })
}
