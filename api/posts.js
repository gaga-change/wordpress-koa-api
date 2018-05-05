const posts = require('../control/posts')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {
    let ret = await posts.getPosts()
    let idArr = []
    ret.forEach(item => idArr.push(item.ID))
    ret = await posts.getDetailById(idArr)
    ret.forEach(item => {
        item.post_content = item.post_content.replace(/(\s|<[^>]+>)+/ig, ' ')
        item.post_content = item.post_content.substr(0, 56).trim()
    })
    ctx.body = {
        idArr: idArr.join(','),
        data: ret
    }
}

/** 获取最新文章 */
exports.getNewPosts = async (ctx) => {
    let ret = await posts.getNewPosts()
    ctx.body = {
        ret
    }
}