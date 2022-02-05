import mysql from 'mysql';
import { Database } from '../interfaces/database.interface';
import { Person } from '../interfaces/person.interface';

export class MySQL implements Database {
  private db: any;

  constructor() {
    this.connection();
  }

  private connection() {
    this.db = mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase',
    });
    this.db.connect();
  }

  delete(): any {
    console.log(this.db);
  }

  get(): any {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM person_table', (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  create(obj: Person): any {
    const { fname, lname, age, city, phoneNumber, email, companyName } = obj;
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO person_table SET ?',
        { fname, lname, age, city, phoneNumber, email, companyName },
        (err: Error) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(302);
          }
        },
      );
    });
  }

  update(): any {
    console.log(this.db);
  }

  clear(): any {
    console.log(this.db);
  }

  endConnection(): void {
    this.db.end((err: Error) => {
      if (err) {
        return err;
      }
      return true;
    });
  }
}
