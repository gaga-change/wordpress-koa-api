const query = require('./query')

/** 搜索标签 */
exports.queryTag = () => {
    return query(`SELECT t.*, tt.*
    FROM wp_terms AS t 
    INNER JOIN wp_term_taxonomy AS tt
    ON t.term_id = tt.term_id
    WHERE tt.taxonomy IN ('post_tag')
    AND tt.count > 0
    ORDER BY tt.count DESC
    LIMIT 45`)
}

/** 搜索分类目录 */
exports.queryCategory = () => {
    return query(`	SELECT t.*, tt.*
    FROM wp_terms AS t 
    INNER JOIN wp_term_taxonomy AS tt
    ON t.term_id = tt.term_id
    WHERE tt.taxonomy IN ('category')
    AND tt.count > 0
    ORDER BY t.name ASC`)
}
/** 根据ID获取标签 */
exports.getPostsTerms = (idArr) => {
    return query(`SELECT t.*, tt.*, tr.object_id
    FROM wp_terms AS t 
    INNER JOIN wp_term_taxonomy AS tt
    ON t.term_id = tt.term_id
    INNER JOIN wp_term_relationships AS tr
    ON tr.term_taxonomy_id = tt.term_taxonomy_id
    WHERE tt.taxonomy IN ('category', 'post_tag', 'post_format')
    AND tr.object_id IN (?)
    ORDER BY t.name ASC`, [idArr])
}