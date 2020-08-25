import axios from '../index'

export const getFlavorById = (id) => {
  return axios.request({
    url: '/nova/getFlavorById',
    method: 'get',
    params: { id }
  })
}
