const mysql = require('mysql')
const env = require("dotenv").config({ path: "./.env" })

function getConnection(){
    return mysql.createConnection({
        host: process.env.HOST, 
        user: process.env.DBUSER, 
        password: process.env.PASSWORD, 
        database: (process.env.NODE_ENV !== 'test') ? process.env.DATABASE : process.env.TESTDATABASE, 
        port: process.env.PORT, 
        ssl:true
    })
}

module.exports = {getConnection}
