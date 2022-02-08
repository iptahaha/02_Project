import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { MySQL } from '../database/mySQL.database';
import { Person } from '../interfaces/person.interface';
import authMiddleware from '../middleware/auth.middleware';

export class MySQLController implements DatabaseController {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/data', authMiddleware, this.getData);
    this.router.post('/create', authMiddleware, this.createData);
    this.router.delete('/delete:*', authMiddleware, this.deleteData);
    this.router.delete('/clear', authMiddleware, this.clearData);
  }

  clearData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .clear()
      .then(() => {
        dbRequest.endConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
  }

  createData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .create(req.body)
      .then(() => {
        dbRequest.endConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
  }

  deleteData(req: Request, res: Response): void {
    const deleteId = req.url.split(':')[1];
    const dbRequest = new MySQL();
    dbRequest
      .delete(deleteId)
      .then(() => {
        dbRequest.endConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
  }

  getData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .get()
      .then((value: Person) => {
        dbRequest.endConnection();
        res.send(value);
      })
      .catch(() => {
        dbRequest.endConnection();
        res.status(409).end();
      });
  }
}
