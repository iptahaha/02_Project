import { Router } from 'express'

interface Controller {
  path: string;
  router: Router;
}

export interface resolveUser {
  code: number,
  id: number,
}

export interface user {
  login: string,
  id: number,
}

export default Controller
