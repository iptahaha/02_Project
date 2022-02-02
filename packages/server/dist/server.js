"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./controllers/auth"));
const pages_1 = __importDefault(require("./controllers/pages"));
const app_1 = __importDefault(require("./app"));
// import {MongoDB} from "./database/mongoDB";
// import MongoController from "./controllers/mainMongo";
const app = new app_1.default(
// [new AuthenticationController(), new PagesController(), new MongoController()]
[new auth_1.default(), new pages_1.default()]);
app.start();
// const mongoDB = new MongoDB();
// mongoDB.start();
