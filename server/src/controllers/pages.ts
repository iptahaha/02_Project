import {Router} from "express";
import { Request, Response } from 'express';
import path from "node:path";
import Controller from "../interfaces/controller.interface";

class PagesController implements Controller{
  path = '/'
  router = Router()

  constructor() {
    this.checkRoutes()
  }

  checkRoutes() {
    this.router.get('/', this.login)
    this.router.get('/login', this.login)
    this.router.get('/register', this.register)
    this.router.get('/main', this.main)
  }

  main(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/main.html'));
  }

  login(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/login.html'))
  }

  register(req:Request, res:Response) {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/register.html'))
  }
}

export default PagesController;
