import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { MySQL } from '../database/mySQL.database';
import { Person } from '../interfaces/person.interface';

export class MySQLController implements DatabaseController {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/data', this.getData);
    this.router.post('/create', this.createData);
  }

  clearData(req: Request, res: Response): void {}

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

  deleteData(req: Request, res: Response): void {}

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
