import { Request, Response, Router } from 'express';
import path from 'node:path';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';

class PagesController implements Controller {
  path = '/';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  private checkRoutes() {
    this.router.get('/', PagesController.redirect);
    this.router.get('/login', PagesController.login);
    this.router.get('/register', PagesController.register);
    this.router.get('/main', authMiddleware, PagesController.main);
  }

  static redirect(req: Request, res: Response) {
    res.redirect('/main');
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
