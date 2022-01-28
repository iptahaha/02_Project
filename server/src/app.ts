import express from 'express'; //const express = require('express');
import pagesRoutes from './routes/pages';
import authRoutes from './routes/auth';

import mongoDB from './database/mongoDB';
// mongoDB()//.then(r => console.log(r));
class Application {
  app: express.Application;

  constructor() {
    this.app = express();//const app = express();
    this.settings();
   // this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', 3000);
  }

  //middlewares() {
    // this.app.use(express.urlencoded({extended: false}));
    // this.app.use(express.json());
  //}

  routes() {
    this.app.use('/', pagesRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use(express.static('../web/dist/'));
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on http://localhost:${this.app.get('port')}`);
    })
  }
}

const app = new  Application();
app.start();
