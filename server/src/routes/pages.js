const express = require('express');
const path = require("node:path");

const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('register')
})

router.get('/login', (req,res) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/login.html'))
})

router.get('/register', (req,res) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/register.html'))
})

router.get('/main', (req,res) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/main.html'))
})

module.exports = router;
