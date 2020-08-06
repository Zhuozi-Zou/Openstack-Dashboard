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
