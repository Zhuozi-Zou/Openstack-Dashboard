import Cookies from 'js-cookie'
import keystone from '../store/module/keystone'
import Vue from 'vue'

export const setTokenToCookie = (token, tokenName = 'token') => {
  const expires = new Date()
  expires.setTime(expires.getTime() + 23 * 24 * 60 * 60 * 1000)
  Cookies.set(tokenName, token, { expires })
}

export const getTokenFromCookie = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

export const getNewToken = async () => {
  try {
    const res = await keystone.actions.getAdminToken()
    return res.data
  } catch (e) {
    console.log('getNewToken: ' + e)
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
