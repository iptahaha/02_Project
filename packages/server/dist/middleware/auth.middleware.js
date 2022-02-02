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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mySQL_1 = __importDefault(require("../database/mySQL"));
dotenv_1.default.config();
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jwtCookie = req.cookies.jwt;
            if (jwtCookie) {
                const decoded = jsonwebtoken_1.default.verify(jwtCookie, process.env.JWT_SECRET);
                const accessUser = new mySQL_1.default();
                accessUser.checkLoginUniqueness(decoded.login)
                    .then((value) => {
                    if (!value) {
                        accessUser.endConnection();
                        next();
                    }
                    else {
                        accessUser.endConnection();
                        res.redirect('/login');
                    }
                }).catch(() => {
                    res.redirect('/login');
                });
            }
            else {
                res.redirect('/login');
            }
        }
        catch (_a) {
            res.redirect('/login');
        }
    });
}
exports.default = authMiddleware;
