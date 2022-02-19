import Application from './app';
import PagesController from './controllers/pages.controller';
import { AuthenticationController } from './controllers/auth.controller';
import { MySQLController } from './controllers/mySQL.controller';
import MongoController from './controllers/mongo.controller';

const app = new Application([
  new AuthenticationController(),
  new PagesController(),
  new MySQLController(),
  new MongoController(),
]);

app.start();
