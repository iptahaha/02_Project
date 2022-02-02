// import {Request, Response, Router} from 'express';
// import Controller from "../interfaces/controller.interface";
// import {MongoDB} from "../database/mongoDB";
// import {MongoClient, ObjectId} from "mongodb";
//
// class MongoController implements Controller {
//   path = '/main';
//   router = Router();
//
//   constructor() {
//     this.router.get('/mongo', this.main)
//     //this.router.delete(`/mongo:id`, this.mainDelete)
//   }
//
//   async main(req: Request, res: Response, next:any) {
//     const mongoDB = new MongoDB();
//     await mongoDB.start();
//     const client = new MongoClient(process.env.MONGOURL || 'mongodb+srv');
//     await client.connect();
//     const collection = client.db().collection("users");
//     collection.find().toArray(function(err, users){
//       if(err)  {
//         return console.log(err);
//       }
//       res.setHeader("Content-Type", "text/html");
//       res.send(users);
//       next();
//     });
//   }
//
//   // async mainDelete( req: Request, res: Response) {
//   //   const id = new ObjectId(req.params.id);
//   //   const client = new MongoClient(process.env.MONGOURL || 'mongodb+srv');
//   //   await client.connect();
//   //   const collection = client.db('mongo').collection("users");
//   //   try{
//   //             const result = await collection.findOneAndDelete({_id: id});
//   //             const user = result.value;
//   //             res.send(user);
//   //         }
//   //         catch(err){return console.log("error");
//   //   }
//   // }
// }
//
// export default MongoController;
