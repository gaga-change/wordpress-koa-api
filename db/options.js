const query = require('./query')

/** 获取全局变量 */
exports.getOptions = () => {
    return query(`SELECT option_name, option_value
    FROM wp_options
    WHERE autoload = 'yes'`)
}