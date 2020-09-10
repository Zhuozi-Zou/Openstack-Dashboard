import Cookies from 'js-cookie'
import store from '@/store'
import { firstLetterUpper } from '@/lib/tools'

export const setTokenToCookie = (token, tokenName = 'token') => {
  const params = {}
  if (tokenName === 'token') {
    const expires = new Date()
    expires.setTime(expires.getTime() + 23 * 60 * 60 * 1000) // 23 hrs
    params.expires = expires
  }
  Cookies.set(tokenName, token, params)
}

export const getTokenFromCookie = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

export const getNewToken = async () => {
  try {
    await store.dispatch('getAdminToken')
  } catch (e) {
    console.log('getNewToken: ' + e)
  }
}

export const getToken = async () => {
  if (!getTokenFromCookie()) {
    await getNewToken()
  }
}

export const joinSelections = (selection, toJoin) => {
  return selection.map(item => {
    return `"${item[toJoin]}"`
  }).join(', ')
}

export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) {
      const childArr = getOpenArrByName(name, item.children)
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)
        return true
      }
    }
  })
  return arr
}

export const setTitle = (title) => {
  window.document.title = title || 'openstack dashboard'
}

export const pathToText = (path) => {
  return path.split('_').map(item => {
    return firstLetterUpper(item)
  }).join(' ')
}
