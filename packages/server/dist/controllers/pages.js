"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_path_1 = __importDefault(require("node:path"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
class PagesController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.checkRoutes();
    }
    checkRoutes() {
        this.router.get('/', this.redirect);
        this.router.get('/login', this.login);
        this.router.get('/register', this.register);
        this.router.get('/main', auth_middleware_1.default, this.main);
    }
    redirect(req, res) {
        res.redirect('/main');
    }
    main(req, res) {
        res.sendfile(node_path_1.default.resolve(node_path_1.default.resolve(), './../web', 'dist/main.html'));
    }
    login(req, res) {
        res.sendfile(node_path_1.default.resolve(node_path_1.default.resolve(), './../web', 'dist/login.html'));
    }
    register(req, res) {
        res.sendfile(node_path_1.default.resolve(node_path_1.default.resolve(), './../web', 'dist/register.html'));
    }
}
function test(req, res, next) {
    console.log('test');
    next();
}
exports.default = PagesController;
