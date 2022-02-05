import { Request, Response } from 'express';
import { Person } from './person.interface';

export interface Database {
  get(): any;
  delete(): any;
  clear(): any;
  update(): any;
  create(obj: Person): any;
}
