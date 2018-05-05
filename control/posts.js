const posts = require('../db/posts')

/** 获取文章列表 */
exports.getPosts = (start, length) => {
    return posts.queryPosts(start, length)
}

/** 获取总数 */
exports.findRows = () => {
    return posts.findRows()
}

/**
 * 根据ID获取文章详情
 * @param {Array} idArr ID集合
 */
exports.getDetailById = (idArr) => {
    return posts.queryPostsByID(idArr)
}

/** 根据ID获取指定详情 */
exports.queryPostByID = (id) => {
    return posts.queryPostByID(id)
}

/** 获取最新文章 */
exports.getNewPosts = () => {
    return posts.getNewPosts()
}