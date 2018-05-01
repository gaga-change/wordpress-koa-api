const posts = require('../control/posts')

/** 获取文章列表 */
exports.getPosts = async (ctx) => {
    let ret = await posts.getPosts()
    let idArr = []
    ret.map(item => idArr.push(item.ID))
    ret = await posts.getDetailById(idArr)
    ctx.body = {
        idArr: idArr.join(','),
        data: ret
    }
}
