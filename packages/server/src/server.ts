import PagesController from './controllers/pages';
import Application from './app';
import { AuthenticationController } from './controllers/auth';
// import {MongoDB} from "./database/mongoDB";
// import MongoController from "./controllers/mainMongo";

const app = new Application(
  // [new AuthenticationController(), new PagesController(), new MongoController()]
  [new AuthenticationController(), new PagesController()],
);

app.start();

// const mongoDB = new MongoDB();
// mongoDB.start();
