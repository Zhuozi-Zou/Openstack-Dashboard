export const objDelReturn = (obj, toDelete) => {
  const delValue = obj[toDelete]
  delete obj[toDelete]
  return delValue
}

export const objRemoveEmptyVal = (obj) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (!val) delete obj[key]
  })
}

export const getAgeStr = (createdTimeStr) => {
  const ageTime = new Date().getTime() - new Date(createdTimeStr).getTime()
  const sec = Math.floor(ageTime / 1000) || 1
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)
  const week = Math.floor(day / 7)
  const month = Math.floor(day / 30)
  const year = Math.floor(day / 365)

  if (year) return `${year} year(s)`
  if (month) return `${month} month(s)`
  if (week) return `${week} week(s)`
  if (day) return `${day} day(s)`
  if (hr) return `${hr} hour(s)`
  if (min) return `${min} minute(s)`
  if (sec) return `${sec} second(s)`
}

export const bytesToSize = (bytes, fracDigits = 2) => {
  const bytesNum = Number(bytes)
  if (!bytesNum || bytesNum === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytesNum) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(fracDigits) + ' ' + sizes[i]
}

export const localSave = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}

export const localRead = (name) => {
  return JSON.parse(localStorage.getItem(name))
}

export const firstLetterUpper = (s) => {
  return s.charAt(0).toUpperCase() + s.substring(1)
}

export const getCurrentYMD = () => {
  const date = new Date()
  const Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()

  if (M < 10) M = '0' + M
  if (D < 10) D = '0' + D

  return Y + '-' + M + '-' + D
}

export const addADay = (curDate) => {
  return new Date(curDate.getTime() + 24 * 60 * 60 * 1000 - 1)
}
