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

export const localSave = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}

export const localRead = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
