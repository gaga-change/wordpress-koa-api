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
    .get('/posts/search', posts.search) // 模糊搜索

    /**
     * 剩余需要接口
     *  搜索接口
     *  按标签搜索接口
     *  按分类目录搜索接口
     *  获取banner图片接口
     */
module.exports = router