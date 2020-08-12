import axios from '../index'

export const getFloatingIps = token => {
  return axios.request({
    url: '/neutron/getFloatingIps',
    method: 'get',
    params: { token }
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
