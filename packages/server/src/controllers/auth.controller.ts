import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import MySQLUser from '../database/userDataBase';
import Controller from '../interfaces/controller.interface';
import { generateJWT } from '../middleware/jwtGenerate.middleware';

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
  }

  static async register(req: Request, res: Response) {
    const userData = req.body;
    const newUser = new MySQLUser();

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).end();
    }

    newUser
      .checkLoginUniqueness(userData.login)
      .then(async (value: boolean) => {
        if (!value) {
          newUser.endConnection();
          res.status(401).end();
        } else {
          const hashedPassword = await bcrypt.hash(userData.password, 8);
          await newUser
            .createNewUser(userData.login, hashedPassword)
            .then(() => {
              newUser.endConnection();
              res.writeHead(302, { Location: '/login' }).end();
            })
            .catch(() => {
              newUser.endConnection();
              res.status(409).end();
            });
        }
      })
      .catch(() => {
        newUser.endConnection();
        res.status(409).end();
      });
    return userData;
  }

  static login(req: Request, res: Response) {
    const userData = req.body;
    const user = new MySQLUser();

    if (!userData.login || !userData.password) {
      res.status(403).end();
    }

    user
      .loginIn(userData.login, userData.password)
      .then((value: any) => {
        user.endConnection();

        if (value.code === 302) {
          generateJWT(res, value.id, value.login);
          res.writeHead(value.code, { Location: '/main' }).end();
          return userData;
        }
        res.status(value).end();
        return userData;
      })
      .catch((err) => {
        user.endConnection();
        res.status(409).end();
      });

    return userData;
  }
}
