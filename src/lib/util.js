import Cookies from 'js-cookie'
import keystone from '../store/module/keystone'
import Vue from 'vue'

export const setTokenToCookie = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}

export const getTokenFromCookie = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

export const getNewToken = async () => {
  try {
    const res = await keystone.actions.getAdminToken()
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const getToken = async () => {
  const token = getTokenFromCookie()
  if (!token) {
    return await getNewToken()
  }
  return token
}

export const station = new Vue()
