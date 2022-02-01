import AuthenticationController from "./controllers/auth";
import PagesController from "./controllers/pages";
import Application from "./app";
import {MongoDB} from "./database/mongoDB";
import MongoController from "./controllers/mainMongo";

const app = new Application(
  [new AuthenticationController(), new PagesController(), new MongoController()]
);

app.start();

// const mongoDB = new MongoDB();
// mongoDB.start();
