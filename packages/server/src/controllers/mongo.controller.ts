import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import authMiddleware from '../middleware/auth.middleware';
import { MongoDB } from '../database/mongoDB.database';
import { Person } from '../interfaces/person.interface';

class MongoController implements DatabaseController {
  path = '/mongo';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/data', authMiddleware, this.getData);
    this.router.post('/create', authMiddleware, this.createData);
    this.router.post('/update:*', authMiddleware, this.updateData);
    this.router.delete('/delete:*', authMiddleware, this.deleteData);
    this.router.delete('/clear', authMiddleware, this.clearData);
  }

  clearData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
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
    const dbRequest = new MongoDB();
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

    const dbRequest = new MongoDB();
    dbRequest
      .delete(deleteId)
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((code: number) => {
        res.status(code).end();
      });
  }

  getData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .get()
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
    const dbRequest = new MongoDB();
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

export default MongoController;
