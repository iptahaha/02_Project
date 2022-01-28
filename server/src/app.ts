import express from 'express'; //const express = require('express');
// const mysql = require('mysql')
// const path = require("node:path");
// const dotenv = require('dotenv').config()
// const cookieParser = require('cookie-parser')
// const {response} = require("express");
import morgan from 'morgan';
import expressHandlebars from 'express-handlebars';
import path from "path";
//routes
import indexRoutes from './routes/index';
import pagesRoutes from './routes/pages';
import authRoutes from './routes/auth';


class Application {
  app: express.Application;

  constructor() {
    this.app = express();//const app = express();
    this.settings();
    this.route();
    this.middleware();
  }

  settings() {
    this.app.set('port', 3000);
    this.app.set('../web/dist/', path.join(__dirname, '../web/dist/'));
    this.app.engine('.html', expressHandlebars({
      layoutsDir: path.join(this.app.get('./../web/dist'), 'layouts'),
      partialsDir: path.join(this.app.get('./../web/dist'), 'partials'),
      defaultLayout: 'main',
      extname: '.hbs'
    }));
    this.app.set('view engine', '.hbs');
  }

  middleware() {
    this.app.use(morgan('dev'));
    this.app.use(express.static('../web/dist/'));//app.use(express.static('../web/dist/'))
    this.app.use('/', require('./routes/pages'))// app.use('/', require('./routes/pages'))
    this.app.use('/auth', require('./routes/auth'))// app.use('/auth', require('./routes/auth'))
    // app.use(express.static('./dist/'))
  }

  route() {
    this.app.use('/', indexRoutes);
    this.app.use('/page', pagesRoutes);
    this.app.use('/auth', authRoutes);

    this.app.use(express.static(path.join(__dirname, '../web/dist/')));
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on http://localhost:${this.app.get('port')}`);
    })
  }
}

export default Application;
