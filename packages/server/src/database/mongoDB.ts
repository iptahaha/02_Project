import {MongoClient} from 'mongodb';
// import {users} from './users';
//
// export class MongoDB {
//   client: MongoClient;
//
//   constructor() {
//     this.client = new MongoClient(process.env.MONGOURL || 'mongodb+srv');
//   }
//
//   async start() {
//     await this.client.connect();
//     //console.log("Connected successfully to server mongo");
//     try {
//       this.client.db().listCollections({name: 'users'})
//         .next(async (err: any, collinfo: any) => {
//           if (collinfo) {
//             console.log('mongodb successfully'); // The collection exists (уже есть запись в облаке)
//             this.client.db().collection('users').find().toArray(function (err: any, result: any) {
//               //console.log(result);
//             });
//           } else {
//             console.log('start mongo');
//             await this.addNewCollection();
//           }
//         });
//       return this.client.db().collection('users');
//     } catch (e) {
//       console.log(e, 'err mongo');
//     }
//   }
//
//   private async addNewCollection() {
//     await this.client.db().createCollection('users');// add collection
//     const collection = this.client.db().collection('users');
//     await collection.insertMany(users);//document bson
//     collection.find().toArray((err: any, result: any) => {
//       //console.log(result);
//       this.client.close();
//     });
//     console.log('add database mongo')
//   }
// }
