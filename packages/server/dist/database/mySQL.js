"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const bcrypt_1 = __importDefault(require("bcrypt"));
class MySQLUser {
    constructor() {
        this.connection();
    }
    connection() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'userdatabase'
        });
        this.db.connect();
    }
    checkLoginUniqueness(loginValue) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT login FROM user_table WHERE login = ?', loginValue, (err, res) => {
                if (err) {
                    reject(409);
                }
                else {
                    if (res.length > 0) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                }
            });
        });
    }
    createNewUser(login, password) {
        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTO user_table SET ?', { login: login, password: password }, (err) => {
                if (err) {
                    reject(409);
                }
                else {
                    resolve(302);
                }
            });
        });
    }
    loginIn(login, password) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * from user_table WHERE login = ?', login, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(409);
                }
                else {
                    if (result.length > 0) {
                        if (!(yield bcrypt_1.default.compare(password, result[0].password))) {
                            resolve(401);
                        }
                        else {
                            resolve({
                                code: 302,
                                id: result[0].user_id,
                                login: result[0].login
                            });
                        }
                    }
                    else {
                        resolve(401);
                    }
                }
            }));
        });
    }
    endConnection() {
        this.db.end((err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
exports.default = MySQLUser;
