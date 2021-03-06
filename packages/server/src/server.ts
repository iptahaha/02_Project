import Application from './app';
import PagesController from './controllers/pages.controller';
import { AuthenticationController } from './controllers/auth.controller';
import { MySQLController } from './controllers/mySQL.controller';
import { MongoController } from './controllers/mongo.controller';
import { GraphController } from './controllers/graphDB.controller';
import { PostgreSQLController } from './controllers/postgreSQL.controller';

const app = new Application([
  new AuthenticationController(),
  new PagesController(),
  new MySQLController(),
  new MongoController(),
  new GraphController(),
  new PostgreSQLController(),
]);

app.start();
