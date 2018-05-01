const router = require('koa-router')()
const tag = require('./tag')

router.get('/', async (ctx) => {
    ctx.body = 'WordPress Koa Api'
}).get('/tags', tag.getAll)

module.exports = router