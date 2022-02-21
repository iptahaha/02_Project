import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from '../interfaces/controller.interface';
import { MySQL } from '../database/mySQL.database';

dotenv.config();

export class AuthMiddleware {
  public static next: NextFunction;

  private static res: Response;

  private static req: Request;

  constructor(req: Request, res: Response, next: NextFunction) {
    AuthMiddleware.req = req;
    AuthMiddleware.res = res;
    AuthMiddleware.next = next;
  }

  static mainAuth(req = this.req, res = this.res, next = this.next) {
    try {
      const jwtCookie = req.cookies.jwt;
      if (jwtCookie) {
        const decoded: user = <user>jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);
        const loginInQuery = `SELECT * from user_table WHERE login = '${decoded.login}'`;
        const jwtQuery = `SELECT * FROM jwt_table WHERE jwt = '${jwtCookie}'`;
        const accessUser = MySQL.getInstance();
        accessUser
          .read(jwtQuery)
          .then((jwtResult: string) => {
            if (jwtResult.length > 0) {
              return Promise.reject({ message: 'JWT_ERROR' });
            }
            return accessUser.read(loginInQuery);
          })
          .then((result: any) => {
            if (result.length > 0) {
              req.user = decoded;
              next();
            } else {
              res.redirect(303, '/login');
            }
          })
          .catch(() => {
            res.redirect(303, '/login');
          });
      } else {
        res.redirect(303, '/login');
      }
    } catch {
      res.redirect(303, '/login');
    }
  }

  static subAuth(req = this.req, res = this.res, next = this.next) {
    try {
      const jwtCookie = req.cookies.jwt;
      if (jwtCookie) {
        const decoded: user = <user>jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);
        const loginInQuery = `SELECT * from user_table WHERE login = '${decoded.login}'`;
        const accessUser = MySQL.getInstance();
        accessUser
          .read(loginInQuery)
          .then((result: any) => {
            if (result.length > 0) {
              res.redirect(303, '/main');
              req.user = decoded;
            } else {
              next();
            }
          })
          .catch(() => {
            next();
          });
      } else {
        next();
      }
    } catch {
      next();
    }
  }
}
