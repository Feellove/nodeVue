const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')//把koa2上下文的formData数据解析到ctx.request.body中
const cors = require('koa2-cors') //实现跨越
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())//所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头


;(async () =>{
  await connect()
  initSchemas()
})()

//信息展示
app.use(async (ctx) =>{
  ctx.body = '<h1>Hello Koa2</h1>'
})

//监听端口号
app.listen(3333, () =>{
  console.log('[Server] starting at port 3333')
})
