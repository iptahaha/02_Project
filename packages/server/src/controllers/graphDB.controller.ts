import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { GraphDB } from '../database/neo4j.database';
import { RejectError } from '../interfaces/rejectError.interface';

export class GraphController implements DatabaseController {
  path = '/graph';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  // AuthMiddleware.mainAuth,
  checkRoutes() {
    this.router.get('/data', this.readData);
    this.router.post('/create', AuthMiddleware.mainAuth, this.createData);
    this.router.post('/update:*', AuthMiddleware.mainAuth, this.updateData);
    this.router.delete('/delete:*', AuthMiddleware.mainAuth, this.deleteData);
    this.router.delete('/clear', AuthMiddleware.mainAuth, this.clearData);
  }

  clearData(req: Request, res: Response): void {
    const dbRequest = GraphDB.getInstance();
    dbRequest
      .clear()
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  createData(req: Request, res: Response): void {
    const dbRequest = GraphDB.getInstance();
    dbRequest
      .create(req.body)
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  deleteData(req: Request, res: Response) {
    const deleteId = req.url.split(':')[1];
    const dbRequest = GraphDB.getInstance();
    dbRequest
      .delete(deleteId)
      .then((code: number) => {
        res.status(code).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  readData(req: Request, res: Response) {
    const dbRequest = GraphDB.getInstance();
    dbRequest
      .read()
      .then((result: any) => {
        res.send(result);
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  updateData(req: Request, res: Response) {
    const updatedId = req.url.split(':')[1];
    const dbRequest = GraphDB.getInstance();
    dbRequest
      .update(req.body, Number(updatedId))
      .then((result: any) => {
        res.send(result);
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }
}
