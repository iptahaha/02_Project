import { Request, Response, NextFunction, Router } from 'express';
import path from "node:path";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middleware/auth.middleware";


class PagesController implements Controller{
  path = '/'
  router = Router()

  constructor() {
    this.checkRoutes()
  }

  private checkRoutes() {
    this.router.get('/', this.login)
    this.router.get('/login', this.login)
    this.router.get('/register', this.register)
    this.router.get('/main', authMiddleware, this.main)
  }

  main(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/main.html'))
  }

  login(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/login.html'))
  }

  register(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/register.html'))
  }

}

function test (req: Request, res: Response, next: NextFunction) {
  console.log('test')
  next()
}

export default PagesController;
