const express = require('express');
const mysql = require('mysql')
const path = require("node:path");
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const {response} = require("express");

const app = express();

//
app.use(express.static('../web/dist/'))
// app.use(express.static('./dist/'))

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log(`Server on http://localhost:5000`)
})
