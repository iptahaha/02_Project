import { Request, Response } from 'express';
const mysql = require("mysql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mySQL = require('../database/mySQL')

exports.register = (req:Request ,res:Response) => {
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
