import { Request, Response, Router } from 'express';
import Controller from './controller.interface';

export interface DatabaseController extends Controller {
  path: string;
  router: Router;

  readData(req: Request, res: Response): void;

  createData(req: Request, res: Response): void;

  deleteData(req: Request, res: Response): void;

  clearData(req: Request, res: Response): void;

  updateData(req: Request, res: Response): void;
}
