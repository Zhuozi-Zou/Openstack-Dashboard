export const baseURL =
  process.env.NODE_ENV === 'production' ? 'http://production.com' : ''

// 这里的size应该与flowNode.js中的node大小一致
export const topoIconSize = {
  height: 30,
  width: 50
}
