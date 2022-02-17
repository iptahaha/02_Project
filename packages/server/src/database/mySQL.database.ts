import mysql, { Connection, QueryError } from 'mysql2';
import { Database } from '../interfaces/database.interface';
import { Person } from '../interfaces/person.interface';

export class MySQL implements Database {
  private static instance: MySQL | null;

  private db: any;

  constructor() {
    this.connection();
  }

  public static getInstance() {
    if (!MySQL.instance) {
      MySQL.instance = new MySQL();
      console.log('Noviy instance');
    }
    console.log('Stariy instance');
    return MySQL.instance;
  }



  private connection() {
    this.db = mysql.createConnection({
      // connectionLimit: 5,
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase',
    });

    this.db.on('error', (err: Error) => {

      MySQL.instance = null;
      console.log('Instans udalilsya');
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
            console.log(err);
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
}
