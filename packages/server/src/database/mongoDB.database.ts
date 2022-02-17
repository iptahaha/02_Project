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
          reject(409);
        }
        const persons = await this.db.db('userdatabase').collection('person_collection');
        persons
          .find()
          .toArray()
          .then((value: Person[]) => {
            resolve(value);
          });
      });
    });
  }

  clear(): any {
    return new Promise((resolve, reject) => {
      this.db.connect(async (err: MongoError) => {
        if (err) {
          reject(409);
        }
        const result = await this.db
          .db('userdatabase')
          .collection('person_collection')
          .deleteMany({});

        if (result) {
          resolve(200);
        } else {
          reject(409);
        }
      });
    });
  }

  create(obj: Person): any {
    return new Promise((resolve, reject) => {
      this.db.connect(async (err: MongoError) => {
        if (err) {
          reject(409);
        }
        const persons = await this.db.db('userdatabase').collection('person_collection');
        persons
          .find()
          .sort({ id: -1 })
          .limit(1)
          .toArray()
          .then(async (value: Person[]) => {
            let id;
            if (value.length === 0) {
              id = 1;
            } else if (value.length === 1 && value[0].id) {
              id = 1 + value[0].id;
            }
            const user: Person = obj;
            user.id = id;
            const result = await this.db
              .db('userdatabase')
              .collection('person_collection')
              .insertOne(user);

            if (result) {
              resolve(200);
            } else {
              reject(409);
            }
          });
      });
    });
  }

  delete(id: string): any {
    return new Promise((resolve, reject) => {
      this.db.connect(async (err: MongoError) => {
        if (err) {
          reject(409);
        }

        const result = await this.db
          .db('userdatabase')
          .collection('person_collection')
          .deleteOne({ id: Number(id) });

        if (result) {
          resolve(200);
        } else {
          reject(409);
        }
      });
    });
  }

  update(obj: Person, id: number): any {
    return new Promise((resolve, reject) => {
      this.db.connect(async (err: MongoError) => {
        if (err) {
          reject(409);
        }

        const query = { id };
        const result = await this.db
          .db('userdatabase')
          .collection('person_collection')
          .updateOne(query, { $set: obj });

        if (result) {
          resolve(200);
        } else {
          reject(409);
        }
      });
    });
  }
}
