import mongoose from 'mongoose';

async function connect() {
  try {
    // @ts-ignore
    mongoose.connect('mongodb://localhost/ts-app-tutorial', {useNewUrlParser: true});
    console.log("mongoodb")
  } catch {
    console.log('Error');
    console.log('dddd')
  }
}

export default connect;
