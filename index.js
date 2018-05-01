const Koa = require('koa')
const logger = require('koa-logger')
const config = require('./config')
const api = require('./api')
const app = new Koa()

app.use(logger())
app.use(api.routes())

app.listen(config.PORT)
