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

  static user(req = this.req, res = this.res, next = this.next) {
    const obj = req.body;
    const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log(obj);
    if (obj.login && !obj.login.match(loginRegex)) {
      res.status(401).send({ message: 'INCORRECT_LOGIN_DATA' });
    } else if (obj.password && obj.password && !obj.password.match(passwordRegex)) {
      res.status(401).send({ message: 'INCORRECT_PASSWORD_DATA' });
    } else if (obj.confrimPassword && !obj.confirmPassword.match(passwordRegex)) {
      res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    } else if (obj.confrimNewPassword && !obj.confirmPassword.match(passwordRegex)) {
      res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    } else if (obj.NewPassword && !obj.confirmPassword.match(passwordRegex)) {
      res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    } else {
      next();
    }
  }

  static person(req = this.req, res = this.res, next = this.next) {
    const obj = req.body;
    console.log(obj);
    const phoneReg = /([+]?\d{1,2}[.-s]?)?(\d{3}[.-]?){2}\d{4}/g;
    const emailReg =
      /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

    if (obj.fname.length < 2 || obj.fname.length > 30 || !obj.fname) {
      res.status(401).send({ message: 'INCORRECT_FNAME_DATA' });
    } else if (obj.lname.length < 2 || obj.lname.length > 30) {
      res.status(401).send({ message: 'INCORRECT_LNAME_DATA' });
    } else if (obj.age < 18 || obj.age > 120 || !obj.age) {
      res.status(401).send({ message: 'INCORRECT_AGE_DATA' });
    } else if (obj.city.length < 2 || obj.city.length > 30) {
      res.status(401).send({ message: 'INCORRECT_CITY_DATA' });
    } else if (!obj.phoneNumber.match(phoneReg)) {
      res.status(401).send({ message: 'INCORRECT_PHONE_NUMBER_DATA' });
    } else if (!obj.email.match(emailReg)) {
      res.status(401).send({ message: 'INCORRECT_EMAIL_DATA' });
    } else if (obj.companyName.length < 3 || obj.companyName.length > 30) {
      res.status(401).send({ message: 'INCORRECT_COMPANY_NAME_DATA' });
    } else {
      next();
    }
  }
}
