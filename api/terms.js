const terms = require('../control/terms')

/** 获取标签 */
exports.getTags = async (ctx) => {
    let ret = await terms.getTags()
    ctx.body = {
        data: ret
    }
}

/** 获取分类目录 */
exports.getCategory = async (ctx) => {
    let ret = await terms.getCategory()
    ctx.body = ret
}