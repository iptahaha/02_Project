import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import MySQLUser from '../database/userDataBase';
import Controller from '../interfaces/controller.interface';
import { generateJWT } from '../middleware/jwtGenerate.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { RejectError } from '../interfaces/rejectError.interface';

dotenv.config();

export class AuthenticationController implements Controller {
  path = '/auth';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.post('/register', AuthenticationController.register);
    this.router.post('/login', AuthenticationController.login);
    this.router.post('/change-login', authMiddleware, AuthenticationController.changeLogin);
    this.router.post('/change-password', authMiddleware, AuthenticationController.changePassword);
    this.router.delete('/logout', authMiddleware, AuthenticationController.logout);
  }

  static async register(req: Request, res: Response) {
    const userData = req.body;
    const dbRequest = new MySQLUser();

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).send({ message: 'CONFIRM_PASSWORD_ERROR' });
    }

    dbRequest
      .checkLoginUniqueness(userData.login)
      .then(async (value) => {
        if (typeof value === 'boolean') {
          const hashedPassword = await bcrypt.hash(userData.password, 8);
          if (value) {
            dbRequest.createNewUser(userData.login, hashedPassword).then(() => res.redirect('/login'));
          }

          if (!value) {
            res.status(401).send({ message: 'LOGIN_NOT_UNIQUE' });
          }
        }
      })
      .catch((value) => {
        dbRequest.endConnection();
        res.status(value.code).send({ message: value.message });
      });
  }

  static login(req: Request, res: Response) {
    const userData = req.body;
    const dbRequest = new MySQLUser();

    if (!userData.login || !userData.password) {
      res.status(403).send({ message: 'EMPTY_LOGIN_PASSWORD' });
    }

    dbRequest
      .loginIn(userData.login, userData.password)
      .then((value: any) => {
        dbRequest.endConnection();

        if (value.code === 302) {
          generateJWT(res, value.id, value.login);
          res.redirect(302, '/main');
          return userData;
        }
        res.status(value).end();
        return userData;
      })
      .catch((value: RejectError) => {
        console.log(value);
        dbRequest.endConnection();
        res.status(value.code).send({ message: value.message });
      });

    return userData;
  }

  static async changeLogin(req: Request, res: Response) {
    const { login, id } = req.user;
    const { password } = req.body;
    const newLogin = req.body.login;
    const dbRequest = new MySQLUser();

    dbRequest
      .loginIn(login, password)
      .then(() => dbRequest.checkLoginUniqueness(newLogin))
      .then((value) => {
        if (typeof value === 'boolean') {
          if (value) {
            return dbRequest.changeColumnValue(id, newLogin, 'login');
          }
          res.status(401).send({ message: 'LOGIN_NOT_UNIQUE' });
        }
      })
      .then((value) => {
        if (typeof value === 'number') {
          dbRequest.endConnection();
          res.clearCookie('jwt').redirect(302, '/login');
        }
      })
      .catch((value: RejectError) => {
        dbRequest.endConnection();
        res.status(value.code).send({ message: value.message });
      });
  }

  static async changePassword(req: Request, res: Response) {
    const { login, id } = req.user;
    const { password, newPassword, confirmNewPassword } = req.body;
    const dbRequest = new MySQLUser();

    if (newPassword !== confirmNewPassword) {
      return res.status(403).send({ message: 'CONFIRM_PASSWORD_ERROR' });
    }

    dbRequest
      .loginIn(login, password)
      .then(async () => await bcrypt.hash(newPassword, 8))
      .then((codedPassword) => dbRequest.changeColumnValue(id, codedPassword, 'password'))
      .then(() => {
        dbRequest.endConnection();
        res.clearCookie('jwt').redirect(302, '/login');
      })
      .catch((value: RejectError) => {
        dbRequest.endConnection();
        res.status(value.code).send({ message: value.message });
      });
  }

  static async logout(req: Request, res: Response) {
    req.user = null;
    res.clearCookie('jwt').redirect(302, '/login');
  }
}
