const router = require('koa-router')()
const terms = require('./terms')
const posts = require('./posts')
const options = require('./options')

router
    .get('/tags', terms.getTags) // 标签
    .get('/category', terms.getCategory) // 分类目录
    .get('/options', options.getOptions) // 参数
    .get('/posts', posts.getPosts) // 文章列表
    .get('/posts/new', posts.getNewPosts) // 最新文章
    .get('/post', posts.getPost) // 获取指定文章
    .get('/posts/getArchives', posts.getArchives) // 按月归档

module.exports = router