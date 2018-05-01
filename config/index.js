module.exports = {
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost', // mysql host
    MYSQL_PORT: process.env.MYSQL_PORT || '3306', // 端口号
    MYSQL_USER: process.env.MYSQL_USER || 'root', // mysql 用户名
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123456', // 密码
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'wordpress', // 数据库
    PORT: process.env.PORT || '8080' // 服务端口
}