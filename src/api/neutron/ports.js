import axios from '../index'

export const getPortById = (id) => {
  return axios.request({
    url: '/neutron/getPortById',
    method: 'get',
    params: { id }
  })
}

export const listPorts = (filters) => {
  return axios.request({
    url: '/neutron/listPorts',
    method: 'get',
    params: { filters }
  })
}
