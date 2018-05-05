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

/** 获取文章的标签以及分类目录 */
exports.getPostsTerms = (idArr) => {
    return terms.getPostsTerms(idArr)
}