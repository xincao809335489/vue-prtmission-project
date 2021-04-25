import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '../utils/cookies'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 公共接口
  timeout: 3 * 1000 // 超时时间
})
// 请求拦截
service.interceptors.request.use(config => {
  // 发请求头前做一些处理，数据转化，配置请求头设置token设置loading等
  config.headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded' // 配置请求头
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
  }
  // 注意使用token时需要引入cookie方法或者本地存储等方法，推荐使用js-cookie
  const token = getToken() // 这里取token之前，你肯定需要拿到token存一下
  if (token) {
    config.params = {
      token: token
    } // 如果要求携带在参数中
    config.headers.token = token // 如果要求携带在请求头中
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  return res
}, error => {
  // 接收到异常响应的处理
  if (error && error.response) {
    // 处理公共的错误，根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '未找到资源'
        window.location.href = '/NotFound'
        break
      case 405:
        error.message = '请你去方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '请求不可用'
        break
      case 504:
        error.message = '请求超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `链接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    error.message('链接服务器失败')
  }
  Message.error(error.message)
  return Promise.reject(error.response)
})
// 导出文件
export default service
