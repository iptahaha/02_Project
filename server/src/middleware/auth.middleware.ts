import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import MySQLUser from "../database/mySQL";

dotenv.config()

async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  try {
    const jwtCookie = req.cookies.jwt
    const decoded = jwt.verify(jwtCookie, <string>process.env.JWT_SECRET)
    next()

  } catch {
    res.redirect('/login')
  }

}

export default authMiddleware




