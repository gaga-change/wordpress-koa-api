const posts = require('../db/posts')
const terms = require('./terms')

/** 获取文章列表 */
exports.getPosts = async (start, length) => {
    // 获取列表文章ID
    let ret = await posts.queryPosts(start, length)
    return listDetail(ret[0], ret[1])
}

/** 模糊搜索 */
exports.search = async (start, length, search) => {
    let ret = await posts.search(start, length, search)
    return listDetail(ret[0], ret[1])
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

/** 按月份归档 */
exports.getArchives = () => {
    return posts.getArchives()
}

async function listDetail(idObjArr, rowsArr) {
    let rows = rowsArr[0] || { count: 0 }
    let idArr = [] // 文章ID数组
    idObjArr.forEach(item => idArr.push(item.ID)) // 转为数组
    let postArr = [] // 处理后的文章列表
    // 获取详情、标签、总数
    ret = await Promise.all([posts.queryPostsByID(idArr), terms.getPostsTerms(idArr)])
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
    return Promise.resolve({
        count: rows.count,
        data: postArr
    })
}