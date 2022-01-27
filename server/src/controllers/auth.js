const mysql = require("mysql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mySQL = require('../database/mySQL')

exports.register = (req,res) => {
    // let data = ''
    // req.on('data', chunk => {
    //     data += chunk;
    // })
    // req.on('end', () => {
    //     if (data) {
    //         console.log(data)
    //     }
    // })
    const test = new mySQL()
    test.takeAll()
    // res.end()
    console.log('a')
}