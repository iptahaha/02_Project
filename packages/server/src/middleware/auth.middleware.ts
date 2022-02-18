import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from '../interfaces/controller.interface';
import { MySQL } from '../database/mySQL.database';

dotenv.config();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
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

export default authMiddleware;
