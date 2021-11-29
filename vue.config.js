module.exports = {
  //基本路径
  publicPath: './',
  //输出文件目录
  outputDir: 'dist',
  //webpack-dev-server相关配置
  devServer: {
    // port: 8011,
    host: 'localhost',
    open: true, //配置游览器自动访问
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
