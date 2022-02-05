import Application from './app';
import PagesController from './controllers/pages.controller';
import { AuthenticationController } from './controllers/auth.controller';
import { MySQLController } from './controllers/mySQL.controller';

// import {MongoDB} from "./database/mongoDB";
// import MongoController from "./controllers/mainMongo";

const app = new Application(
  // [new AuthenticationController(), new PagesController(), new MongoController()]
  [new AuthenticationController(), new PagesController(), new MySQLController()],
);

app.start();
// const mongoDB = new MongoDB();
// mongoDB.start();
