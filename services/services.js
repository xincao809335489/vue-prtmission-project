const express = require('express')
const bodyParser = require('body-parser')
const Mock = require('mockjs')
const apiData = require('./data/login.json') // 引入模拟接口的部分json数据
const menuData = require('./data/menus.json') // 引入菜单信息
const {
  randomCode,
  sendCode
} = require('./utils/getMessage')
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

const lists = Mock.mock({
  'data|30': [{
    'name|+1': ['斑马', '狮子', '野兔', '毛驴'],
    'id|+1': 0,
    'desc|+1': ['斑马万里奔腾', '狮子真威猛，害怕', '野兔真可爱', '毛驴真萌萌哒'],
    date: Random.date(),
    'src|+1': ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg']
  }]
})
// 解析post请求参数
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json()) // data参数以字典格式传输
// 获取列表数据
app.post('/getListsData', function (req, res) {
  const {
    index,
    size
  } = req.body
  console.log(index, size)
  const startRow = index * size // 开始显示的行
  const endRow = (index + 1) * size // 结束显示的行
  const data = lists.data.slice(startRow, endRow)
  res.json(Mock.mock({
    status: 200,
    data: data,
    total: lists.data.length
  }))
})
// 登录数据
app.post('/login', function (req, res) {
  const {
    phone
  } = req.body
  res.json(Mock.mock({
    status: 1,
    data: apiData.tokens[phone]
  }))
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
      res.json(Mock.mock({
        status: 1,
        msg: '发送验证码成功'
      }))
    } else {
      // 发送失败
      res.json(Mock.mock({
        status: 0,
        msg: '发送验证码失败'
      }))
    }
  })
})
// 退出登录
app.get('/logOut', function (req, res) {
  res.json(Mock.mock({
    status: 1
  }))
})
// 获取菜单数据
app.post('/menus', function (req, res) {
  const token = req.body.token
  res.send(menuData[token])
})

// 服务监听
const server = app.listen('8090', '0.0.0.0', (req, res) => {
  const host = server.address().address
  const port = server.address().port
  // 反问的地址为：http://127.0.0.1:8090（0.0.0.0是没法访问的）
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
