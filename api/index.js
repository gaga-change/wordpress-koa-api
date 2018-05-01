const router = require('koa-router')()
const terms = require('./terms')

router.get('/tags', terms.getTags)
    .get('/category', terms.getCategory)

module.exports = router