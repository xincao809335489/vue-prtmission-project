const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const Mock = require('mockjs')
const apiData = require('./data/login.json') // 引入模拟接口的部分json数据
const menuData = require('./data/menus.json') // 引入菜单信息
const formData = require('./data/createForm.json') // 引入自定义表单的数据
const clothesData = require('./data/clothes.json') // 引入树形结构数据
const { randomCode, sendCode } = require('./utils/getMessage')
const app = express()
const Random = Mock.Random
// 设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// 获取首页数据
const pics = Mock.mock({
  'data|33': [
    {
      'id|+1': 0,
      'name|+1': ['杨幂', '胡歌', '刘涛', '赵丽颖'],
      'engName|+1': ['ym', 'hg', 'lt', 'zly'],
      date: Random.date(),
      'src|+1': ['ym/1.webp', 'hg/1.webp', 'lt/1.webp', 'zly/1.webp']
    }
  ]
})
// 获取图片信息
const picInfo = Mock.mock({
  'data|6': [
    {
      title: '',
      engName: '',
      desc: '',
      'src|+1': ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp']
    }
  ]
})
// 解析post请求参数
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json()) // data参数以字典格式传输
// 获取列表数据
app.post('/getPics', function (req, res) {
  const { pageIndex, pageSize } = req.body.params
  const startRow = pageIndex * pageSize // 开始显示的行
  const endRow = (pageIndex + 1) * pageSize // 结束显示的行
  const data = pics.data.slice(startRow, endRow)
  res.json(
    Mock.mock({
      status: 200,
      data: data,
      pageIndex,
      pageSize,
      totalPage: Math.floor(pics.data.length / pageSize)
    })
  )
})
// 登录数据
app.post('/login', function (req, res) {
  const { phone } = req.body
  res.json(
    Mock.mock({
      status: 1,
      data: apiData.tokens[phone]
    })
  )
})
// 获取用户信息
app.post('/getInfo', function (req, res) {
  const { token } = req.body
  res.send(apiData.users[token])
})
// 短信验证码
app.get('/sendMsg', (req, res) => {
  const phone = req.query[0]
  console.log(req.query)
  const code = randomCode(6) // 生成6位数字随机验证码
  sendCode(phone, code, function (success) {
    if (success) {
      // 发送成功
      res.json(
        Mock.mock({
          status: 1,
          msg: '发送验证码成功'
        })
      )
    } else {
      // 发送失败
      res.json(
        Mock.mock({
          status: 0,
          msg: '发送验证码失败'
        })
      )
    }
  })
})
// 退出登录
app.get('/logOut', function (req, res) {
  res.json(
    Mock.mock({
      status: 1
    })
  )
})
// 获取树形结构数据
app.get('/getClothesData', function (req, res) {
  res.send(clothesData)
})
// 获取菜单数据
app.post('/menus', function (req, res) {
  const token = req.body.token
  res.send(menuData[token])
})
app.post('/getPicInfo', function (req, res) {
  const { name, engName } = req.body.params
  for (var i = 0; i < picInfo.data.length; i++) {
    picInfo.data[i].title = name
    picInfo.data[i].engName = engName
    picInfo.data[i].desc = fs.readFileSync(
      './data/' + engName + '.text',
      'utf-8'
    )
  }
  res.send(picInfo.data)
})
// 获取自定义表单的数据
app.get('/getCreateForms', function (req, res) {
  res.send(formData)
})
// 服务监听
const server = app.listen('8090', '0.0.0.0', (req, res) => {
  const host = server.address().address
  const port = server.address().port
  // 反问的地址为：http://127.0.0.1:8090（0.0.0.0是没法访问的）
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
