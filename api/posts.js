const posts = require('../control/posts')
const terms = require('../control/terms')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {
    let page = parseInt(ctx.query.page) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 12
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29

    let ret = await posts.getPosts(pageSize * (page - 1), pageSize)
    // 搜索总条数
    let rows = await posts.findRows()
    rows = rows[0] || { count: 0 }
    let idArr = []
    ret.forEach(item => idArr.push(item.ID))
    ret = await Promise.all([posts.getDetailById(idArr), terms.getPostsTerms(idArr)])
    let obj = {}
    // 详情循环
    ret[0].forEach(item => {
        item.post_content = item.post_content.replace(/(\s|<[^>]+>)+/ig, ' ')
        item.post_content = item.post_content.substr(0, 56).trim()
        obj[item.ID] = item
    })
    // 分类目录&标签
    ret[1].forEach(item => {
        obj[item.object_id] = { ...obj[item.object_id], ...item }
    })
    let data = []
    for (let key in obj) {
        data.push(obj[key])
    }
    ctx.body = {
        data: {
            ...rows,
            page,
            pageSize,
            pages: Math.ceil(rows.count / pageSize),
            list: data
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