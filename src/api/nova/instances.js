import axios from '../index'

export const getInstanceById = (token, id) => {
  return axios.request({
    url: '/nova/getInstanceById',
    method: 'get',
    params: { token, id }
  })
}
