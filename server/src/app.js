"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const express = require('express');
// const mysql = require('mysql')
// const path = require("node:path");
// const dotenv = require('dotenv').config()
// const cookieParser = require('cookie-parser')
// const {response} = require("express");
class Application {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        this.app.listen(5000, () => {
            console.log(`Server on http://localhost:5000`);
        });
    }
    midelware() {
        this.app.use(express_1.default.static('../web/dist/'));
    }
}
exports.default = Application;
//const app = express();
//
//app.use(express.static('../web/dist/'))
// app.use(express.static('./dist/'))
// app.use('/', require('./routes/pages'))
// app.use('/auth', require('./routes/auth'))
//
// app.listen(5000, () => {
//     console.log(`Server on http://localhost:5000`)
// })
