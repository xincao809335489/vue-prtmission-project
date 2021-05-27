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
  },
  // 获取自定义表单的数据
  getFormData () {
    return http.get('/getCreateForms')
  },
  // 获取树形结构数据
  getCloseData () {
    return http.get('/getClothesData')
  }
}
