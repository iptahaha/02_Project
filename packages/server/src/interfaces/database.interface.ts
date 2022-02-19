import { Person } from './person.interface';

export interface SQLCRUD {
  read(query: string): any;
  delete(query: string): any;
  clear(query: string): any;
  update(query: string, updateColumn: Record<string, unknown> | string): any;
  create(query: string, column: Record<string, unknown>): any;
}

export interface NoSQLCRUD {
  read(): any;
  delete(id: string): any;
  clear(): any;
  update(obj: Person, id: number): any;
  create(obj: Person, query: string): any;
}

// updateColumn?: Record<string, unknown> | string, query?: string
// query: string, column: Record<string, unknown> | string
