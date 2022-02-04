import { Request, Response } from 'express';

export interface Database {
  checkLoginUniqueness(loginValue: string, req: Request, res: Response): any;
}
