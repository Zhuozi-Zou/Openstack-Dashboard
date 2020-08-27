import axios from './index'

export const login = ({ userName, password }) => {
  return axios.request({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export const authorization = () => {
  return axios.request({
    url: '/user/authorization',
    method: 'get'
  })
}
