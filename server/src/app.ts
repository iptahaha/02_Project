import express from 'express'; //const express = require('express');
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import mongoDB from './database/mongoDB';
import AuthenticationController from "./controllers/auth";
import PagesController from "./controllers/pages";
// mongoDB()//.then(r => console.log(r));

declare module 'express-serve-static-core' {
  interface Request {
    user?: any
  }
  interface Response {
    user?: any
  }
}

class Application {
  app: express.Application;

  constructor(controllers: any) {
    this.app = express();//const app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.controllers(controllers)
  }

  settings() {
    this.app.set('port', process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(cookieParser())
  }

  routes() {
    this.app.use(express.static('../web/dist/'));
  }

  controllers(controllers: any) {
    controllers.forEach((el: any) => {
      this.app.use(el.path, el.router)
    })
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on http://localhost:${this.app.get('port')}`);
    })
  }
}

export default Application;
