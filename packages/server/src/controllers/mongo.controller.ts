import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { MongoDB } from '../database/mongoDB.database';
import { Person } from '../interfaces/person.interface';
import { ValidationMiddleware } from '../middleware/validation.middleware';

export class MongoController implements DatabaseController {
  path = '/mongo';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/data', AuthMiddleware.mainAuth, this.readData);
    this.router.post('/create', ValidationMiddleware.person, AuthMiddleware.mainAuth, this.createData);
    this.router.post('/update:*', ValidationMiddleware.person, AuthMiddleware.mainAuth, this.updateData);
    this.router.delete('/delete:*', AuthMiddleware.mainAuth, this.deleteData);
    this.router.delete('/clear', AuthMiddleware.mainAuth, this.clearData);
  }

  clearData(req: Request, res: Response): void {
    const dbRequest = MongoDB.getInstance();
    dbRequest
      .clear()
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }

  createData(req: Request, res: Response): void {
    const dbRequest = MongoDB.getInstance();
    dbRequest
      .create(req.body)
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }

  deleteData(req: Request, res: Response) {
    const deleteId = req.url.split(':')[1];

    if (deleteId === 'null') {
      return res.status(409).end();
    }

    const dbRequest = MongoDB.getInstance();
    dbRequest
      .delete(deleteId)
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }

  readData(req: Request, res: Response): void {
    const dbRequest = MongoDB.getInstance();
    dbRequest
      .read()
      .then((data: Person[]) => {
        res.status(200).send(data);
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }

  updateData(req: Request, res: Response) {
    const updateId = req.url.split(':')[1];

    if (updateId === 'null') {
      return res.status(409).end();
    }
    const dbRequest = MongoDB.getInstance();
    dbRequest
      .update(req.body, Number(updateId))
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }
}
