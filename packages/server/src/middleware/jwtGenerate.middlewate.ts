import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateJWT(res: Response, userId: string, userLogin: string) {
  const token = jwt.sign({ id: userId, login: userLogin }, <string>process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000),
    httponly: true,
  };

  res.cookie('jwt', token, cookieOptions);
}
