const terms = require('../control/terms')

exports.getAll = async (ctx) => {
    let ret = await terms.getTerms()
    ctx.body = ret
}