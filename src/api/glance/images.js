import axios from '../index'

export const getImageById = (id) => {
  return axios.request({
    url: '/glance/getImageById',
    method: 'get',
    params: { id }
  })
}

export const getImages = () => {
  return axios.request({
    url: '/glance/getImages',
    method: 'get'
  })
}

export const deleteImage = (id) => {
  return axios.request({
    url: '/glance/deleteImage',
    method: 'delete',
    data: { id }
  })
}
