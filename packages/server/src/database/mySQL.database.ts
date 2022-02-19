import mysql from 'mysql2';
import { SQLCRUD } from '../interfaces/database.interface';

export class MySQL implements SQLCRUD {
  private static instance: MySQL | null;

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
      // connectionLimit: 5,
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase',
    });

    this.db.on('error', () => {
      MySQL.instance = null;
    });
  }

  delete(query: string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err: Error) => {
        if (err) {
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(200);
        }
      });
    });
  }

  read(query: string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err: Error, result: any) => {
        if (err) {
          console.log(err);
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(result);
        }
      });
    });
  }

  create(query: string, column: Record<string, unknown>): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, column, (err: Error) => {
        if (err) {
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(302);
        }
      });
    });
  }

  update(query: string, updateColumn: Record<string, unknown> | string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, updateColumn, (err: Error) => {
        if (err) {
          console.log(err);
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(302);
        }
      });
    });
  }

  clear(query: string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err: Error) => {
        if (err) {
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(200);
        }
      });
    });
  }
}
