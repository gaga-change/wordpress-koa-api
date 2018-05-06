const posts = require('../control/posts')
const terms = require('../control/terms')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {

    let idArr = [] // 文章ID数组
    let rows = 0 // 文章总数
    let postArr = [] // 处理后的文章列表

    // 处理 page&pageSize两个参数：默认值、取整、最大值
    let page = parseInt(ctx.query.page) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 12
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    // 获取列表文章ID
    let ret = await posts.getPosts(pageSize * (page - 1), pageSize)
    ret.forEach(item => idArr.push(item.ID)) // 转为数组

    // 获取详情、标签、总数
    ret = await Promise.all([posts.getDetailById(idArr), terms.getPostsTerms(idArr), posts.findRows()])
    rows = ret[2][0] || { count: 0 }
    let obj = {}
    // 详情循环，裁剪处理
    ret[0].forEach(item => {
        item.post_content = item.post_content.replace(/(\s|<[^>]+>)+/ig, ' ')
        item.post_content = item.post_content.substr(0, 56).trim()
        obj[item.ID] = item
    })
    // 分类目录&标签 绑定文章
    ret[1].forEach(item => {
        let post = obj[item.object_id]
        let term = item.taxonomy
        post[term] = post[term] || []
        post[term].push(item)
    })
    // 把处理后的文章转为数组
    for (let key in obj) {
        postArr.push(obj[key])
    }
    ctx.body = {
        data: {
            ...rows,
            page,
            pageSize,
            pages: Math.ceil(rows.count / pageSize),
            list: postArr
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