import neo4j from 'neo4j-driver';
import { NoSQLCRUD } from '../interfaces/database.interface';
import { Person } from '../interfaces/person.interface';

export class GraphDB implements NoSQLCRUD {
  private static instance: GraphDB | null;

  private db: any;

  constructor() {
    this.connection();
  }

  private connection() {
    const url = 'neo4j+s://3d3f5f55.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'AdEE0xhCcfJtQAdjvENJgH0cARnHHoNiTVyVTdojOfo';
    const driver = neo4j.driver(url, neo4j.auth.basic(user, password));
    this.db = driver;
  }

  public static getInstance() {
    if (!GraphDB.instance) {
      GraphDB.instance = new GraphDB();
    }
    return GraphDB.instance;
  }

  clear(): any {
    const session = this.db.session();
    return new Promise((resolve, reject) => {
      session
        .run(`MATCH (n:person) DELETE n`)
        .then(() => {
          session.close();
          resolve(200);
        })
        .catch(() => {
          session.close();
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        });
    });
  }

  create(obj: Person): any {
    const session = this.db.session();
    return new Promise((resolve, reject) => {
      session
        .run('MATCH (n:person) WITH n, max(n.id) as id order by id DESC RETURN n LIMIT 1')
        .then((result: any) => {
          let id;
          if (!result.records[0]) {
            id = 1;
          } else {
            id = result.records[0]._fields[0].properties.id.low + 1;
          }
          const query = `CREATE (n:person {id: ${id}, fname: '${obj.fname}', lname: '${obj.lname}', age: '${
            obj.age
          }', city: '${obj.city}', phoneNumber: '${obj.phoneNumber}', email: '${obj.email.toString()}', companyName: '${
            obj.companyName
          }' })`;
          return session.run(query);
        })
        .then(() => {
          session.close();
          resolve(200);
        })
        .catch((err: Error) => {
          console.log(err);
          session.close();
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        });
    });
  }

  delete(id: string): any {
    const session = this.db.session();
    return new Promise((resolve, reject) => {
      session
        .run(`MATCH (n:person {id: ${id}}) DELETE n`)
        .then(() => {
          session.close();
          resolve(200);
        })
        .catch(() => {
          session.close();
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        });
    });
  }

  read(): Promise<any> {
    const session = this.db.session();
    return new Promise((resolve, reject) => {
      session
        .run('Match (n:person) return n')
        .then((result: any) => {
          const dataArr: Person[] = [];
          result.records.forEach((record: any) => {
            const obj = record._fields[0].properties;
            obj.id = obj.id.low;
            dataArr.push(obj);
          });
          session.close();
          resolve(dataArr);
        })
        .catch(() => {
          session.close();
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        });
    });
  }

  update(obj: Person, id: number): any {
    const session = this.db.session();
    return new Promise((resolve, reject) => {
      const query = `Match (n:person {id: ${id}}) SET n.fname = '${obj.fname}', n.lname = '${obj.lname}', n.age = '${obj.age}', n.city ='${obj.city}', n.phoneNumber = '${obj.phoneNumber}', n.email='${obj.email}', n.companyName='${obj.companyName}'`
      session
        .run(query)
        .then(() => {
          session.close();
          resolve(200);
        })
        .catch(() => {
          session.close();
          reject({ code: 409, message: 'CONNECTION_ERROR' });
        });
    });
  }
}
