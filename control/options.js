const options = require('../db/options')

/** 获取全局变量 */
exports.getOptions = () => {
    return options.getOptions()
}