const terms = require('../db/terms')

/**
 * 获取标签列表
 */
exports.getTags = () => {
    return terms.queryTag()
}

/**
 * 获取分类目录
 */
exports.getCategory = () => {
    return terms.queryCategory()
}