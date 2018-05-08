const posts = require('../control/posts')
const terms = require('../control/terms')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {

    // 处理 page&pageSize两个参数：默认值、取整、最大值
    let page = parseInt(ctx.query.page) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 12
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    
    let ret = await posts.getPosts(pageSize * (page - 1), pageSize)
    
    ctx.body = {
        data: {
            ...ret.rows,
            page,
            pageSize,
            pages: Math.ceil(ret.rows.count / pageSize),
            list: ret.postArr
        }
    }
}

/** 获取最新文章 */
exports.getNewPosts = async (ctx) => {
    let ret = await posts.getNewPosts()
    ctx.body = {
        ret
    }
}

/** 根据ID获取指定详情 */
exports.getPost = async (ctx, next) => {
    let postId = ctx.query.postId
    if (!postId) { // 参数校验
        return next()
    }
    let post = await posts.queryPostByID(postId)
    ctx.body = {
        data: post[0]
    }
}

/** 按月份归档 */
exports.getArchives = async (ctx) => {
    let ret = await posts.getArchives()
    ctx.body = {
        data: ret
    }
}

/** 模糊搜索 */
exports.search = async (ctx, next) => {
    let search = ctx.query.search
    if (!search) return next()
    let idArr = []
    let ret = await posts.search(search)
    ret.forEach(item => idArr.push(item.ID)) // 转为数组
    ctx.body = {
        data: ret
    }
}