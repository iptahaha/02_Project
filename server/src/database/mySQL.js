const mysql = require("mysql");
// const dotenv = require('dotenv').config()
//
//
class mySQL {

    constructor() {
    }

    connection() {
        return new Promise((resolve, reject) => {
            resolve(
                mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'root',
                    database: 'userdatabase'
                })
            )
        })
    }

    connect() {
        this.connection().then((res) => {
            res.connect((err) => {
                if (err) {
                    console.log(err)
                    console.log('Some problems')
                } else {
                    res.query('SELECT * FROM user_table', (err, result) => {
                        console.log(result)
                    })
                }
            })
        })
    }

    takeAll() {
        this.connection().then((res) => {
            res.connect((err) =>{
                if (err) {
                    console.log(err)
                    console.log('Some problems')
                } else {
                    res.query('SELECT * FROM user_table', (err, result) => {
                        console.log(result)
                    })
                    res.end()
                }
            })
        })
    }
}

module.exports = mySQL

