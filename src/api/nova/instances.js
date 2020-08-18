import axios from '../index'

export const getInstanceById = (id) => {
  return axios.request({
    url: '/nova/getInstanceById',
    method: 'get',
    params: { id }
  })
}

export const getInstances = () => {
  return axios.request({
    url: '/nova/getInstances',
    method: 'get'
  })
}
