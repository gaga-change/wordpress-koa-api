const query = require('./query')

/** 获取文章列表 */
exports.queryPosts = () => {
    return query(`SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
    FROM wp_posts 
    WHERE 1=1 
    AND wp_posts.post_type = 'post'
    AND (wp_posts.post_status = 'publish'
    OR wp_posts.post_status = 'private') 
    ORDER BY wp_posts.post_date DESC
    LIMIT 0, 10`)
}

/**
 * 根据ID获取文章详情
 * @param {String} idArr ID集合
 */
exports.queryPostsByID = (idArr) => {
    return query(`SELECT wp_posts.*
    FROM wp_posts
    WHERE ID IN (?)`, [idArr])
}