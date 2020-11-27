const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin' : '/'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    proxy: 'http://localhost:5000',
    port: 8088
  }
}
