import {Request, Response, Router} from 'express';
import Controller from "../interfaces/controller.interface";
import MySQLUser from "../database/mySQL";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config()

class AuthenticationController implements Controller {
  path = '/auth';
  router = Router();

  constructor() {
    this.checkRoutes()
  }

  checkRoutes() {
    this.router.post('/register', this.register)
    this.router.post('/login', this.login)
  }

  register(req: Request, res: Response) {
    const userData = req.body;

    if (req.body.password !== req.body.confirmPassword) {

      return res.status(403).end()

    } else {

      const user = new MySQLUser()

      user.checkLoginUniqueness(userData.login)
          .then(async (value: boolean) => {

            if (value) {
              const hashedPassword = await bcrypt.hash(userData.password, 8)

              await user.createNewUser(userData.login, hashedPassword)
                  .then(() => {
                    user.endConnection()
                    return res.writeHead(302, {Location: '/login'}).end()
                  })
                  .catch(() => {
                    return res.status(409).end()
                  })
            }

            if (!value) {

              user.endConnection()
              return res.status(401).end()
            }

          }).catch(() => {

        return res.status(409).end()
      })
    }


  }

  login(req: Request, res: Response) {
    const userData = req.body;
    const user = new MySQLUser();

    if (!userData.login || !userData.password) {
      return res.status(403).end()
    } else {

      user.loginIn(userData.login, userData.password)
          .then((value: any) => {

            if (value.code === 302) {
              const token = jwt.sign({id: value.id, login: value.login}, <string>process.env.JWT_SECRET, {
                expiresIn: Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000
              })

              const cookieOptions = {
                expires: new Date(
                    Date.now() + Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000
                ),
                httponly: true,
              }

              user.endConnection()

              res.cookie('jwt', token, cookieOptions)
              return res.writeHead(value.code, {Location: '/main'}).end()

            } else {

              user.endConnection()
              return res.status(value).end()
            }

          })
          .catch((value) => {
              res.status(value).end()
          });

    }



  }
}

export default AuthenticationController;
