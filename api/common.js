
/** 配置分页信息 */
exports.page = async (ctx, next) => {
    // 处理 page&pageSize两个参数：默认值、取整、最大值
    let page = parseInt(ctx.query.page) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 12
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    ctx._page = page
    ctx._pageSize = pageSize
    await next()
}