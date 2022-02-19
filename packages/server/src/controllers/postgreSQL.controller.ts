import { Request, Response, Router } from 'express';
import { DatabaseController } from '../interfaces/databaseContrroler';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ValidationMiddleware } from '../middleware/validation.middleware';
import { RejectError } from '../interfaces/rejectError.interface';
import { Person } from '../interfaces/person.interface';
import { PostgreSQL } from '../database/postgreSQL.database';

export class PostgreSQLController implements DatabaseController {
  path = '/postgresql';

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

  clearData(req: Request, res: Response) {
    const dbRequest = PostgreSQL.getInstance();
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
    const query = `UPDATE person_table SET fname = '${fname}', lname = '${lname}', age = '${age}', city = '${city}', "phoneNumber" = '${phoneNumber}', email = '${email}', "companyName" = '${companyName}'  WHERE id=${id}`;
    const dbRequest = PostgreSQL.getInstance();
    dbRequest
      .update(query)
      .then(() => {
        res.status(200).end();
      })
      .catch((value: RejectError) => {
        res.status(value.code).send({ message: value.message });
      });
  }

  createData(req: Request, res: Response) {
    const { fname, lname, age, city, phoneNumber, email, companyName } = req.body;
    const query = `insert into person_table (fname, lname, age, city, "phoneNumber", email, "companyName") values (${fname}, ${lname}, ${age}, ${city}, ${phoneNumber}, ${email}, ${companyName});`;
    const dbRequest = PostgreSQL.getInstance();
    dbRequest
      .create(query)
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
    const dbRequest = PostgreSQL.getInstance();
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
    const dbRequest = PostgreSQL.getInstance();
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
