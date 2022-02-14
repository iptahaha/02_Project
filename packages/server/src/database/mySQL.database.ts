import mysql from 'mysql';
import { resolve } from 'eslint-import-resolver-typescript';
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

  delete(id: string): any {
    return new Promise((resolve, reject) => {
      const deleteQuery = `DELETE FROM person_table WHERE id = ${id}`;
      this.db.query(deleteQuery, (err: Error) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve('Super');
        }
      });
    });
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

  update(obj: Person, id: number): any {
    const { fname, lname, age, city, phoneNumber, email, companyName } = obj;
    return new Promise((resolve, reject) => {
      this.db.query(
        `UPDATE person_table SET ? WHERE id=${id}`,
        {
          fname,
          lname,
          age,
          city,
          phoneNumber,
          email,
          companyName,
        },
        (err: Error) => {
          if (err) {
            reject(err);
          } else {
            resolve(302);
          }
        },
      );
    });
  }

  clear(): any {
    return new Promise((resolve, reject) => {
      this.db.query('TRUNCATE TABLE person_table', (err: Error) => {
        if (err) {
          reject();
        } else {
          resolve(200);
        }
      });
    });
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
