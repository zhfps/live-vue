// vue.config.js
const path = require('path')
module.exports = {
  // 配置相对路径
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },
  devServer: {
    port: 9527,
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
