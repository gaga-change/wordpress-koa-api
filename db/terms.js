const query = require('./query')

exports.get = () => {
    return query(`SELECT t.*, tt.*
    FROM wp_terms AS t 
    INNER JOIN wp_term_taxonomy AS tt
    ON t.term_id = tt.term_id
    WHERE tt.taxonomy IN ('post_tag')
    AND tt.count > 0
    ORDER BY tt.count DESC
    LIMIT 45`)
}