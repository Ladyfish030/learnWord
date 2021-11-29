module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.113.186.74/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}