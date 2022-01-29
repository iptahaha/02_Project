import {Request, Response, Router} from 'express';
import Controller from "../interfaces/controller.interface";

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
    let data = ''
    req.on('data', chunk => {
      data += chunk;
    })
    req.on('end', () => {
      console.log(data)
    })
    res.end()
  }

  login(req: Request, res: Response) {
    console.log('login')
  }
}


export default AuthenticationController;
