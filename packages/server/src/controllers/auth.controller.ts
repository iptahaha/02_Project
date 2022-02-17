import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import MySQLUser from '../database/userDataBase';
import Controller from '../interfaces/controller.interface';
import { generateJWT } from '../middleware/jwtGenerate.middleware';
import authMiddleware from '../middleware/auth.middleware';

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
  }

  static async register(req: Request, res: Response) {
    const userData = req.body;
    const dbRequest = new MySQLUser();

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).end();
    }

    dbRequest
      .checkLoginUniqueness(userData.login)
      .then(async (value: boolean) => {
        if (!value) {
          dbRequest.endConnection();
          res.status(401).end();
        } else {
          const hashedPassword = await bcrypt.hash(userData.password, 8);
          await dbRequest
            .createNewUser(userData.login, hashedPassword)
            .then(() => {
              dbRequest.endConnection();
              res.redirect(302, '/login');
            })
            .catch(() => {
              dbRequest.endConnection();
              res.status(409).end();
            });
        }
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
    return userData;
  }

  static login(req: Request, res: Response) {
    const userData = req.body;
    const dbRequest = new MySQLUser();

    if (!userData.login || !userData.password) {
      res.status(403).end();
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
      .catch((err) => {
        dbRequest.endConnection();
        res.status(409).end();
      });

    return userData;
  }

  static changeLogin(req: Request, res: Response) {
    const { login, id } = req.user;
    const { password } = req.body;
    const newLogin = req.body.login;
    const dbRequest = new MySQLUser();

    dbRequest
      .loginIn(login, password)
      .then((value: any) => {
        if (value.code) {
          dbRequest.checkLoginUniqueness(newLogin).then((resolve: boolean) => {
            if (resolve) {
              dbRequest.changeLogin(Number(id), newLogin).then((code: any) => {
                dbRequest.endConnection();
                res.clearCookie('jwt').redirect(302, '/login');
              });
            } else {
              dbRequest.endConnection();
              res.status(403).end();
            }
          });
        } else {
          dbRequest.endConnection();
          res.status(401).end();
        }
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
  }

  static async changePassword(req: Request, res: Response) {
    console.log(req.body);
    console.log(req.user);

    const { login, id } = req.user;
    const { password, newPassword, confirmNewPassword } = req.body;

    const dbRequest = new MySQLUser();

    dbRequest.loginIn(login, password).then((result) => {

    })
  }
}
