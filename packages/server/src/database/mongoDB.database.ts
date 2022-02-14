import { MongoClient, MongoError } from 'mongodb';
import { Database } from '../interfaces/database.interface';
import { Person } from '../interfaces/person.interface';

export class MongoDB implements Database {
  private db: any;

  constructor() {
    this.connection();
  }

  connection() {
    const url =
      'mongodb+srv://admin:admin@users.fdv5b.mongodb.net/users?retryWrites=true&w=majority';
    this.db = new MongoClient(url);
  }

  get(): any {
    return new Promise((resolve, reject) => {
      this.db.connect(async (err: MongoError) => {
        if (err) {
          console.log(err);
          reject(409);
        }
        const persons = await this.db.db('userdatabase').collection('person_collection');
        // persons.find().sort({ id: -1 }).limit(1).toArray().then((docs: any) => {
        //   console.log(docs);
        // })
        persons.find().toArray()
          .then((docs: any) => {
            resolve(docs)
          })
      });
    });
  }

  clear(): any {}

  create(obj: Person): any {}

  delete(id: string): any {}

  update(obj: Person, id: number): any {}
}
