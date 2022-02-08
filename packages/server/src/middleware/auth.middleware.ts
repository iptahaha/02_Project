import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import MySQLUser from '../database/userDataBase';
import { user } from '../interfaces/controller.interface';

dotenv.config();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const jwtCookie = req.cookies.jwt;
    if (jwtCookie) {
      const decoded: user = <user>jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);

      const accessUser = new MySQLUser();
      accessUser
        .checkLoginUniqueness(decoded.login)
        .then((value: boolean) => {
          if (!value) {
            accessUser.endConnection();
            next();
          } else {
            accessUser.endConnection();
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
