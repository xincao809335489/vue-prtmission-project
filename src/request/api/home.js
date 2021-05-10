import http from '../http'
/**
 * http为config中配置的代理名称
 */
export default {
  // 获取滚动加载的数据
  getPicDatas (params) {
    return http.post('/getPics', { params })
  },
  // 获取图片信息详情
  getInfoData (params) {
    return http.post('/getPicInfo', { params })
  }
}
