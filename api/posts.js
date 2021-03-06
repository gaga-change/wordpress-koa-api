const posts = require('../control/posts')
const terms = require('../control/terms')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {
    let ret = await posts.getPosts(ctx._start, ctx._length)
    ctx.body = {
        ...ret
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
    let ret = await posts.search(ctx._start, ctx._length, search)
    ctx.body = {
        ...ret
    }
}