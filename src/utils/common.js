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
