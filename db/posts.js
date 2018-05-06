const query = require('./query')

/** 获取文章列表 */
exports.queryPosts = (start, length) => {
    console.log(start, length)
    return query(`SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
    FROM wp_posts 
    WHERE 1=1 
    AND wp_posts.post_type = 'post'
    AND (wp_posts.post_status = 'publish'
    OR wp_posts.post_status = 'private') 
    ORDER BY wp_posts.post_date DESC
    LIMIT ?, ?`, [0, 10])
}

/** 获取查询总数 */
exports.findRows = () => {
    return query(`SELECT FOUND_ROWS() as count`)
}

/**
 * 根据ID获取文章部分详情
 * @param {String} idArr ID集合
 */
exports.queryPostsByID = (idArr) => {
    return query(`SELECT ID,post_author,post_date,post_content,post_title
    FROM wp_posts
    WHERE ID IN (?)`, [idArr])
}

/** 获取指定ID文章详情 */
exports.queryPostByID = (id) => {
    return query(`SELECT wp_posts.*
    FROM wp_posts 
    WHERE 1=1 
    AND wp_posts.ID = ?
    AND wp_posts.post_type = 'post' 
    ORDER BY wp_posts.post_date DESC`, [id])
}

/** 获取最新5篇文章 */
exports.getNewPosts = () => {
    return query(`SELECT wp_posts.ID,wp_posts.post_title
    FROM wp_posts 
    WHERE 1=1 
    AND wp_posts.post_type = 'post'
    AND ((wp_posts.post_status = 'publish')) 
    ORDER BY wp_posts.post_date DESC
    LIMIT 0, 5`)
}

/** 按月份归档 */
exports.getArchives = () => {
    return query(`	SELECT YEAR(post_date) AS 'year', MONTH(post_date) AS 'month', count(ID) as posts
    FROM wp_posts 
    WHERE post_type = 'post'
    AND post_status = 'publish'
    GROUP BY YEAR(post_date), MONTH(post_date)
    ORDER BY post_date DESC`)
}