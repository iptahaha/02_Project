import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { MySQL } from '../database/mySQL.database';
import { Person } from '../interfaces/person.interface';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { RejectError } from '../interfaces/rejectError.interface';

export class MySQLController implements DatabaseController {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/data', AuthMiddleware.mainAuth, this.readData);
    this.router.post('/create', AuthMiddleware.mainAuth, this.createData);
    this.router.post('/update:*', AuthMiddleware.mainAuth, this.updateData);
    this.router.delete('/delete:*', AuthMiddleware.mainAuth, this.deleteData);
    this.router.delete('/clear', AuthMiddleware.mainAuth, this.clearData);
  }

  clearData(req: Request, res: Response) {
    const dbRequest = MySQL.getInstance();
    const query = `TRUNCATE TABLE person_table`;
    dbRequest
      .clear(query)
      .then(() => {
        res.status(200).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  updateData(req: Request, res: Response) {
    const id = req.url.split(':')[1];

    if (id === 'null') {
      return res.status(409).end();
    }
    const { fname, lname, age, city, phoneNumber, email, companyName } = req.body;
    const query = `UPDATE person_table SET ? WHERE id=${id}`;
    const column = { fname, lname, age, city, phoneNumber, email, companyName };
    const dbRequest = MySQL.getInstance();
    dbRequest
      .update(query, column)
      .then(() => {
        res.status(200).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  createData(req: Request, res: Response) {
    const { fname, lname, age, city, phoneNumber, email, companyName } = req.body;
    const column = { fname, lname, age, city, phoneNumber, email, companyName };
    const query = 'INSERT INTO person_table SET ?';
    const dbRequest = MySQL.getInstance();
    dbRequest
      .create(query, column)
      .then(() => {
        res.status(200).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  deleteData(req: Request, res: Response) {
    const deleteId = req.url.split(':')[1];

    if (deleteId === 'null') {
      return res.status(409).end();
    }

    const query = `DELETE FROM person_table WHERE id = ${deleteId}`;
    const dbRequest = MySQL.getInstance();
    dbRequest
      .delete(query)
      .then(() => {
        res.status(200).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  readData(req: Request, res: Response): void {
    const dbRequest = MySQL.getInstance();
    const query = `SELECT * FROM person_table`;
    dbRequest
      .read(query)
      .then((value: Person[]) => {
        res.send(value);
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }
}
