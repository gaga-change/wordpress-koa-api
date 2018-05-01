const router = require('koa-router')()
const terms = require('./terms')
const posts = require('./posts')

router.get('/tags', terms.getTags)
    .get('/category', terms.getCategory)
    .get('/posts', posts.getPosts)

module.exports = router