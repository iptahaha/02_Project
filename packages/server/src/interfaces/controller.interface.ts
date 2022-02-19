import { Router } from 'express';

interface Controller {
  path: string;
  router: Router;
}

export interface user {
  login: string;
  id: number;
}

export default Controller;
