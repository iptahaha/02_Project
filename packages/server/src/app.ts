import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

class Application {
  app: express.Application;

  constructor(controllers: any) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.controllers(controllers);
  }

  settings() {
    this.app.set('port', process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  routes() {
    this.app.use(express.static('./../web/dist/'));
    this.app.use('/photo', express.static('./../web/public/img'));
  }

  controllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.path, controller.router);
    });
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on http://localhost:${this.app.get('port')}`);
    });
  }
}

export default Application;
