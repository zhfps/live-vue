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
    port: process.env.PORT ? process.env.PORT : 4325,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
