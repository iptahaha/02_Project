import AuthenticationController from "./controllers/auth";
import PagesController from "./controllers/pages";
import Application from "./app";

const app = new Application(
  [new AuthenticationController(), new PagesController()]
);
app.start();
