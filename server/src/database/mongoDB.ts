import mongoose from 'mongoose';

async function connect() {
  await mongoose.connect('mongodb://localhost/ts-app')
    .then(() => {
        console.log("Connected");
      },
      err => {
        console.log(err);
      }
    );
}

export default connect;


