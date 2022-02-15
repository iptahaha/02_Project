import { Request, Response, Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { DatabaseController } from '../interfaces/databaseContrroler';
import authMiddleware from '../middleware/auth.middleware';
import { MongoDB } from '../database/mongoDB.database';

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
        console.log(code);
        res.status(code).end();
      })
      .catch((code: number) => {
        console.log(code);
        res.status(code).end();
      });
  }

  createData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .create(req.body)
      .then((code: number) => {
        console.log(code);
        res.status(code).end();
      })
      .catch((code: number) => {
        console.log(code);
        res.status(code).end();
      });
  }

  deleteData(req: Request, res: Response): void {
    const deleteId = req.url.split(':')[1];
    const dbRequest = new MongoDB();
    dbRequest
      .delete(deleteId)
      .then((data: any) => {
        console.log('Udachnoe udalenie');
        res.send(data);
      })
      .catch(() => {
        console.log('Neudachnoe udalenie');
        res.status(409).send('Jopa');
      });
  }

  getData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .get()
      .then((data: any) => {
        console.log('Udacha');
        res.send(data);
      })
      .catch(() => {
        console.log('Neudacha');
        res.status(409).send('Jopa');
      });
  }

  updateData(req: Request, res: Response): void {
    const updateId = req.url.split(':')[1];
    const dbRequest = new MongoDB();
    dbRequest
      .update(req.body, Number(updateId))
      .then((data: any) => {
        console.log('Udachnoe obnovlenie');
        res.send(data);
      })
      .catch(() => {
        console.log('Neudachnoe obnovlenie');
        res.status(409).send('Jopa');
      });
  }
}

export default MongoController;
