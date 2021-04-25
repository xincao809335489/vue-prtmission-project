import http from '../http'
/**
 * testIp为config中配置的代理名称
 */
export default {
  // 短信验证
  sendMsg (params) {
    return http.get('/sendMsg', params)
  },
  // 登录
  login (phone, psd) {
    return http.post('/login', { phone, psd })
  },
  // 获取用户信息
  getInfo (token) {
    return http.post('/getInfo', { token })
  },
  // 退出登录
  logOut () {
    return http.get('/logOut')
  },
  // 获取菜单数据
  getMenuLists (token) {
    return http.post('/menus', { token })
  }
}
