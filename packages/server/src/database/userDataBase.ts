import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import { RejectError } from '../interfaces/rejectError.interface';

class MySQLUser {
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

  checkLoginUniqueness(loginValue: string): Promise<RejectError | boolean> {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT login FROM user_table WHERE login = ?', loginValue, (err: Error, res: any) => {
        if (err) {
          reject({
            code: 409,
            message: 'CONNECTION_ERROR',
          });
        } else if (res.length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  createNewUser(login: string, password: string): Promise<RejectError | number> {
    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO user_table SET ?', { login, password }, (err: Error) => {
        if (err) {
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else {
          resolve(302);
        }
      });
    });
  }

  loginIn(login: string, password: string): Promise<RejectError | { code: number; id: number; login: string }> {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * from user_table WHERE login = ?', login, async (err: Error, result: any) => {
        if (err) {
          console.log(err);
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        } else if (result.length > 0) {
          if (!(await bcrypt.compare(password, result[0].password))) {
            reject({ code: 403, message: 'WRONG_LOGIN_PASSWORD' });
          } else {
            resolve({
              code: 302,
              id: result[0].user_id,
              login: result[0].login,
            });
          }
        } else {
          reject({ code: 403, message: 'WRONG_LOGIN_PASSWORD' });
        }
      });
    });
  }

  changeColumnValue(id: number, changeValue: string, changeColumn: string): Promise<RejectError | number> {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE user_table SET ${changeColumn}=? WHERE user_id=${id}`, changeValue, (err: Error) => {
        if (err) {
          reject({
            code: 409,
            message: 'CONNECTION_ERROR',
          });
        }
        console.log('Chtoto izmenilos');
        resolve(200);
      });
    });
  }

  changePassword(id: number, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE user_table SET password=? WHERE user_ud=${id}`, newPassword, (err: Error) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('Password izmenilsya');
          resolve(200);
        }
      });
    });
  }

  endConnection() {
    this.db.end((err: Error) => {
      if (err) {
        return err;
      }
      return true;
    });
  }
}

export default MySQLUser;
