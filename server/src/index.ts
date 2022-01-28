import App from './app';
import mongoDB from './database/mongoDB';

//Starting the server
mongoDB()//.then(r => console.log(r));

const app = new  App();
app.start();
