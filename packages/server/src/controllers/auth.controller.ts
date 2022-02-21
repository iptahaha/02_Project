import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Controller from '../interfaces/controller.interface';
import { generateJWT } from '../middleware/jwtGenerate.middleware';
import { RejectError } from '../interfaces/rejectError.interface';
import { MySQL } from '../database/mySQL.database';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ValidationMiddleware } from '../middleware/validation.middleware';

dotenv.config();

export class AuthenticationController implements Controller {
  path = '/auth';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.post('/register', ValidationMiddleware.user, AuthenticationController.register);
    this.router.post('/login', ValidationMiddleware.user, AuthenticationController.login);
    this.router.post(
      '/change-login',
      ValidationMiddleware.user,
      AuthMiddleware.mainAuth,
      AuthenticationController.changeLogin,
    );
    this.router.post(
      '/change-password',
      ValidationMiddleware.user,
      AuthMiddleware.mainAuth,
      AuthenticationController.changePassword,
    );
    this.router.delete('/logout', AuthMiddleware.mainAuth, AuthenticationController.logout);
  }

  static async register(req: Request, res: Response) {
    const { login, password } = req.body;
    const dbRequest = MySQL.getInstance();
    const loginInQuery = `SELECT * from user_table WHERE login = '${login}'`;

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).send({ message: 'CONFIRM_PASSWORD_ERROR' });
    }

    dbRequest
      .read(loginInQuery)
      .then(async (result: any) => {
        if (result.length > 0) {
          return Promise.reject({ code: 401, message: 'LOGIN_NOT_UNIQUE' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const query = 'INSERT INTO user_table SET ?';
        const column = { login, password: hashedPassword };
        return dbRequest.create(query, column);
      })
      .then(() => {
        res.status(200).redirect('/login');
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  static login(req: Request, res: Response) {
    const { login, password } = req.body;
    const dbRequest = MySQL.getInstance();
    const loginInQuery = `SELECT * from user_table WHERE login = '${login}'`;

    if (!login || !password) {
      res.status(403).send({ message: 'EMPTY_LOGIN_PASSWORD' });
    }

    dbRequest
      .read(loginInQuery)
      .then(async (result: any) => {
        if (result.length > 0) {
          const checkPassword = await bcrypt.compare(password, result[0].password);

          if (checkPassword) {
            generateJWT(res, result[0].user_id, result[0].login);
            return res.redirect(302, '/main');
          }
        }
        return Promise.reject({ code: 401, message: 'WRONG_LOGIN_PASSWORD' });
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  static async changeLogin(req: Request, res: Response) {
    const { login, id } = req.user;
    const { password } = req.body;
    const newLogin = req.body.login;
    const loginInQuery = `SELECT * from user_table WHERE login = '${login}'`;
    const dbRequest = MySQL.getInstance();

    try {
      const { jwt } = req.cookies;

      if (jwt) {
        const jwtQuery = `INSERT INTO jwt_table SET ?`;
        const column = { jwt };

        dbRequest
          .create(jwtQuery, column)
          .then(() => dbRequest.read(loginInQuery))
          .then(async (result: any) => {
            if (result.length > 0) {
              const checkPassword = await bcrypt.compare(password, result[0].password);
              const newLoginInQuery = `SELECT * from user_table WHERE login = '${newLogin}'`;
              if (checkPassword) {
                return dbRequest.read(newLoginInQuery);
              }
            }
            return Promise.reject({ code: 401, message: 'WRONG_LOGIN_PASSWORD' });
          })
          .then((value: any) => {
            if (value.length > 0) {
              return Promise.reject({ code: 401, message: 'LOGIN_NOT_UNIQUE' });
            }
            const query = `UPDATE user_table SET login=? WHERE user_id='${id}'`;
            return dbRequest.update(query, newLogin);
          })
          .then(() => {
            res.clearCookie('jwt').redirect(302, '/login');
          })
          .catch((value: RejectError) => {
            res.status(value.code).send({ message: value.message });
          });
      }
    } catch {
      res.status(401).send('LOGOUT_ERROR');
    }
  }

  static async changePassword(req: Request, res: Response) {
    const { login, id } = req.user;
    const { password, newPassword, confirmNewPassword } = req.body;
    const loginInQuery = `SELECT * from user_table WHERE login = '${login}'`;
    const dbRequest = MySQL.getInstance();

    if (newPassword !== confirmNewPassword) {
      return res.status(403).send({ message: 'CONFIRM_PASSWORD_ERROR' });
    }

    try {
      const { jwt } = req.cookies;

      if (jwt) {
        const jwtQuery = `INSERT INTO jwt_table SET ?`;
        const column = { jwt };
        dbRequest
          .create(jwtQuery, column)
          .then((result: any) => {
            if (result.length > 0) {
              return Promise.reject({ code: 401, message: 'JWT_ERROR' });
            }
            return dbRequest.read(loginInQuery);
          })
          .then(async (result: any) => {
            if (result.length > 0) {
              const checkPassword = await bcrypt.compare(password, result[0].password);
              const query = `UPDATE user_table SET password=? WHERE user_id='${id}'`;

              if (checkPassword) {
                if (newPassword === password) {
                  return Promise.reject({ code: 401, message: 'PASSWORD_ALREADY_USE' });
                }
                const hashedPassword = await bcrypt.hash(newPassword, 8);
                return dbRequest.update(query, hashedPassword);
              }
            }
            return Promise.reject({ code: 401, message: 'WRONG_LOGIN_PASSWORD' });
          })
          .then(() => {
            res.clearCookie('jwt').redirect(302, '/login');
          })
          .catch((value: RejectError) => {
            res.status(value.code).send({ message: value.message });
          });
      }
    } catch {
      res.status(403).send({ message: 'JWT_ERROR' });
    }
  }

  static async logout(req: Request, res: Response) {
    const dbRequest = MySQL.getInstance();
    try {
      const { jwt } = req.cookies;
      if (jwt) {
        const query = `INSERT INTO jwt_table SET ?`;
        const column = { jwt };
        dbRequest
          .create(query, column)
          .then(() => {
            req.user = null;
            res.clearCookie('jwt').redirect(302, '/login');
          })
          .catch(() => {
            res.status(403).send({ message: 'CONNECTION_ERROR' });
          });
      }
    } catch {
      res.status(401).send('LOGOUT_ERROR');
    }
  }
}
