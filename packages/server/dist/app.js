"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //const express = require('express');
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
class Application {
    constructor(controllers) {
        this.app = (0, express_1.default)(); //const app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.controllers(controllers);
    }
    settings() {
        this.app.set('port', process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(express_1.default.static('./../web/dist/'));
    }
    controllers(controllers) {
        controllers.forEach((el) => {
            this.app.use(el.path, el.router);
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on http://localhost:${this.app.get('port')}`);
        });
    }
}
exports.default = Application;
