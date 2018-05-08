const query = require('./query')

/** 获取文章列表 */
exports.queryPosts = (start, length) => {
    return query(`SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
    FROM wp_posts 
    WHERE 1=1 
    AND wp_posts.post_type = 'post'
    AND wp_posts.post_status = 'publish'
    ORDER BY wp_posts.post_date DESC
    LIMIT ?, ?; SELECT FOUND_ROWS() as count`, [start, length])
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

/** 模糊搜索 */
exports.search = (start, length, search) => {
    search = '%' + search + '%'
    return query(`SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
    FROM wp_posts 
    WHERE 1=1 
    AND (((wp_posts.post_title LIKE ?)
    OR (wp_posts.post_excerpt LIKE ?)
    OR (wp_posts.post_content LIKE ?))) 
    AND wp_posts.post_type IN ('post', 'page', 'attachment')
    AND wp_posts.post_status = 'publish'
    ORDER BY wp_posts.post_title LIKE ? DESC, wp_posts.post_date DESC
    LIMIT ?, ?; SELECT FOUND_ROWS() as count`, [search, search, search, search, start, length])
}
