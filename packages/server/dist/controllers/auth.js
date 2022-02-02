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
const express_1 = require("express");
const mySQL_1 = __importDefault(require("../database/mySQL"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.checkRoutes();
    }
    checkRoutes() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }
    register(req, res) {
        const userData = req.body;
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(403).end();
        }
        else {
            const user = new mySQL_1.default();
            user.checkLoginUniqueness(userData.login)
                .then((value) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 8);
                    yield user.createNewUser(userData.login, hashedPassword)
                        .then(() => {
                        user.endConnection();
                        return res.writeHead(302, { Location: '/login' }).end();
                    })
                        .catch(() => {
                        return res.status(409).end();
                    });
                }
                if (!value) {
                    user.endConnection();
                    return res.status(401).end();
                }
            })).catch(() => {
                return res.status(409).end();
            });
        }
    }
    login(req, res) {
        const userData = req.body;
        const user = new mySQL_1.default();
        if (!userData.login || !userData.password) {
            return res.status(403).end();
        }
        else {
            user.loginIn(userData.login, userData.password)
                .then((value) => {
                if (value.code === 302) {
                    const token = jsonwebtoken_1.default.sign({ id: value.id, login: value.login }, process.env.JWT_SECRET, {
                        expiresIn: Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000
                    });
                    const cookieOptions = {
                        expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000),
                        httponly: true,
                    };
                    user.endConnection();
                    res.cookie('jwt', token, cookieOptions);
                    return res.writeHead(value.code, { Location: '/main' }).end();
                }
                else {
                    user.endConnection();
                    return res.status(value).end();
                }
            })
                .catch((value) => {
                res.status(value).end();
            });
        }
    }
}
exports.default = AuthenticationController;
