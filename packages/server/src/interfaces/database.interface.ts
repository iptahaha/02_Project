import { Request, Response } from 'express';
import { Person } from './person.interface';

export interface Database {
  get(): any;
  delete(id: string): any;
  clear(): any;
  update(obj: Person, id: number): any;
  create(obj: Person): any;
}
