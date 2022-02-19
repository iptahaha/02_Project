import { NextFunction, Request, Response } from 'express';

export class ValidationMiddleware {
  public static next: NextFunction;

  private static res: Response;

  private static req: Request;

  constructor(req: Request, res: Response, next: NextFunction) {
    ValidationMiddleware.req = req;
    ValidationMiddleware.res = res;
    ValidationMiddleware.next = next;
  }
}
