const options = require('../control/options')
const jssr = require('jssr')

/** 获取全局变量 */
exports.getOptions = async (ctx) => {
    // 主标题 blogname
    // 父标题 blogdescription
    // theme_mods_pro-blog
    // banner图
    // 菜单栏
    let ret = await options.getOptions()
    let opts = turnObj(ret)
    ctx.body = {
        data: {
            blogname: opts.blogname,
            blogdescription: opts.blogdescription,
            'theme_mods_pro-blog': jssr.parse(opts['theme_mods_pro-blog'])
        }
    }
}

/** 把options 转为对象 */
function turnObj(arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]['option_name']] = arr[i]['option_value']
    }
    return obj
}