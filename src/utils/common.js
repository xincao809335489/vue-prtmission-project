import { CodeToText, regionData } from 'element-china-area-data'
// 手机号验证
export function isvalidPhone (str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

// 验证密码   密码，8-16字母和數字組成，不能是纯数字或者纯英文
export function isvalidPass (str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  return reg.test(str)
}

//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function isvalidUsername (str) {
  const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{4,15}$/
  return reg.test(str)
}
/**
 * 获取省市区三级联动数据
 * @returns 数据数组
 */
export function getRegionData () {
  return regionData
}
/**
 * 日期格式化
 * @param {*} date 例如：'2021-4-12 10:22:22'
 * @param {*} format 参数格式
 */
export function dateFormat (date, format = 'YYYY-MM-DD HH:mm:ss') {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth(),
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
  for (const key in config) {
    format = format.replace(key, config[key])
  }
  return format
}
/**
 * 将省市区编码转成汉字
 * @param {*} codeArray 选中的编码数组
 * @returns 汉字组成的数组
 */
export function getCodeToText (codeArray) {
  let area = ''
  switch (codeArray.length) {
    case 1:
      area += CodeToText[codeArray[0]]
      break
    case 2:
      area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]]
      break
    case 3:
      area +=
        CodeToText[codeArray[0]] +
        '/' +
        CodeToText[codeArray[1]] +
        '/' +
        CodeToText[codeArray[2]]
      break
    default:
      break
  }
  return area
}
