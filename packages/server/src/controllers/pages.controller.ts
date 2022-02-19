import { Request, Response, Router } from 'express';
import path from 'node:path';
import Controller from '../interfaces/controller.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';

class PagesController implements Controller {
  path = '/';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  private checkRoutes() {
    this.router.get('/', AuthMiddleware.mainAuth, PagesController.main);
    this.router.get('/login', AuthMiddleware.subAuth, PagesController.login);
    this.router.get('/register', AuthMiddleware.subAuth, PagesController.register);
    this.router.get('/main', AuthMiddleware.mainAuth, PagesController.main);
  }

  static main(req: Request, res: Response) {
    res.sendFile(path.resolve(path.resolve(), './../web', 'dist/main.html'));
  }

  static login(req: Request, res: Response) {
    res.sendFile(path.resolve(path.resolve(), './../web', 'dist/login.html'));
  }

  static register(req: Request, res: Response) {
    res.sendFile(path.resolve(path.resolve(), './../web', 'dist/register.html'));
  }
}

export default PagesController;
