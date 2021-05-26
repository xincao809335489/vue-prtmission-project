// 引入多页面的配置pages
// const pages = require('./src/utils/pages')
const webpack = require('webpack')
module.exports = {
  publicPath: '/',
  // 当运行vue-cli-service build时生成的生产环境构建环境的目录。用法和webpack的output.path一样，不要修改output.path
  outputDir: 'dist',
  // 放置打包后生成的静态资源（js、css、img、fonts）的目录，该目录相对于outputDir。
  assetsDir: ' ',
  // 指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
  indexPath: 'index.html',
  filenameHashing: true,
  // 多页面模式配置
  // pages: pages.getPages(),
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: true,
  devServer: {
    // headers: {
    //   'X-foo': '112233'
    // },
    hot: true, // 热更新替换，更新页面
    port: '8081', // 端口号
    host: 'localhost', // 指定要使用的主机IP。默认情况下这是localhost。
    open: true, // 自动启动浏览器
    compress: true, // 为所服务的一切启用gzip压缩
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090', // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      },
      '/foo': {
        target: 'http://localhost:8080', // 本地模拟数据服务器
        changeOrigin: true,
        pathRewrite: {
          '^/foo': '' // 去掉接口地址中的foo字符串
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery', // 创建 '$'、'jQuery'、'window.jQuery' 三个变量指向依赖jquery
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
