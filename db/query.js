const mysql = require('mysql')
const config = require('../config')
const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    multipleStatements: true
})

module.exports = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    connection.release()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            }
        })
    })
}