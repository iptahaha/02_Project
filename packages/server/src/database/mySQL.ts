import {Database} from "../interfaces/database.interface";
const mysql = require('mysql')
import bcrypt from "bcrypt";

class MySQLUser implements Database {
  private db: any;

  constructor() {
    this.connection();
  }

  private connection() {
    this.db = mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase'
    });
    this.db.connect()
  }

  checkLoginUniqueness(loginValue: string): any {
    return new Promise((resolve,reject) => {

      this.db.query(
        'SELECT login FROM user_table WHERE login = ?', loginValue, (err: Error, res: any) => {
          if (err) {
            reject(409);
          } else {

            if (res.length > 0) {
              resolve(false);
            } else {
              resolve(true);
            }

          }
        }
      )
    })
  }

  createNewUser(login: string, password: string) {

    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO user_table SET ?', {login: login, password: password}, (err: Error) => {
        if (err) {
          reject(409)
        } else {
          resolve(302)
        }
      })
    })

  }

  loginIn(login: string, password: string) {

    return new Promise((resolve, reject) => {

      this.db.query('SELECT * from user_table WHERE login = ?', login, async (err: Error, result: any) => {

        if (err) {
          reject(409)
        } else {

          if (result.length > 0) {

            if (!await bcrypt.compare(password, result[0].password)) {
              resolve(401)
            } else {
              resolve({
                code: 302,
                id: result[0].user_id,
                login: result[0].login
              })
            }

          } else {
            resolve(401)
          }

        }

      })

    })

  }

  endConnection() {
    this.db.end((err: Error) => {
      if(err) {
        console.log(err)
      }
    })
  }

}

export default MySQLUser;
