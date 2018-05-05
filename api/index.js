const router = require('koa-router')()
const terms = require('./terms')
const posts = require('./posts')
const options = require('./options')

router.get('/tags', terms.getTags) // 标签
    .get('/category', terms.getCategory) // 分类目录
    .get('/posts', posts.getPosts) // 文章列表
    .get('/options', options.getOptions) // 参数
    .get('/posts/new', posts.getNewPosts) // 最新文章
    

module.exports = router