import mysql, { Connection } from 'mysql';
import { Database } from '../interfaces/database.interface';
import { Person } from '../interfaces/person.interface';

export class MySQL implements Database {
  private static instance: MySQL;

  private db: any;

  constructor() {
    this.connection();
  }

  public static getInstance() {
    if (!MySQL.instance) {
      MySQL.instance = new MySQL();
    }

    return MySQL.instance;
  }

  private connection() {
    this.db = mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase',
    });
  }

  delete(id: string): any {
    return new Promise((resolve, reject) => {
      const deleteQuery = `DELETE FROM person_table WHERE id = ${id}`;
      this.db.query(deleteQuery, (err: Error) => {
        if (err) {
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

  async checkConnection(connection: Connection) {
    const disconnected = await new Promise((resolve) => {
      connection.ping((err: Error) => {
        resolve(err);
      });
    });
    if (disconnected) {
      this.connection();
    }
  }

  // endConnection(): void {
  //   this.db.connect();
  //   this.db.end((err: Error) => {
  //     if (err) {
  //       return err;
  //     }
  //     return true;
  //   });
  // }
}
