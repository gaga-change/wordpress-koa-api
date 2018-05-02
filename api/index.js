const router = require('koa-router')()
const terms = require('./terms')
const posts = require('./posts')
const options = require('./options')

router.get('/tags', terms.getTags)
    .get('/category', terms.getCategory)
    .get('/posts', posts.getPosts)
    .get('/options', options.getOptions)

module.exports = router