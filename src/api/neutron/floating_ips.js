import axios from '../index'

export const getFloatingIps = token => {
  return axios.request({
    url: '/neutron/getFloatingIps',
    method: 'get',
    params: { token }
  })
}

export const createFloatingIp = (token, id) => {
  return axios.request({
    url: '/neutron/createFloatingIp',
    method: 'post',
    data: { token, id }
  })
}

export const getFloatingIpPools = token => {
  return axios.request({
    url: '/neutron/getFloatingIpPools',
    method: 'get',
    params: { token }
  })
}
