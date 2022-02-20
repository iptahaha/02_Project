import { Pool } from 'pg';
import { SQLCRUD } from '../interfaces/database.interface';

export class PostgreSQL implements SQLCRUD {
  private static instance: PostgreSQL | null;

  private db: any;

  constructor() {
    this.connection();
  }

  public static getInstance() {
    if (!PostgreSQL.instance) {
      PostgreSQL.instance = new PostgreSQL();
    }
    return PostgreSQL.instance;
  }

  private connection() {
    this.db = new Pool({
      host: process.env.POSTGRESQL_HOST || 'localhost',
      user: process.env.POSTGRESQL_USER || 'postgres',
      password: process.env.POSTGRESQL_PASSWORD || 'root',
      database: process.env.POSTGRESQL_DATABASE || 'persons',
      port: 5432,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    });

    this.db.on('error', () => {
      PostgreSQL.instance = null;
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
          resolve(result.rows);
        }
      });
    });
  }

  create(query: string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err: Error) => {
        if (err) {
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(302);
        }
      });
    });
  }

  update(query: string): any {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err: Error) => {
        if (err) {
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
