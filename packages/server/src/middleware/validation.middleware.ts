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

  static user(req = this.req, res = this.res, next = this.next): Response | boolean {
    const obj = req.body;
    const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (obj.login && !obj.login.match(loginRegex)) {
      return res.status(401).send({ message: 'INCORRECT_LOGIN_DATA' });
    }
    if (obj.password && !obj.password.match(passwordRegex)) {
      return res.status(401).send({ message: 'INCORRECT_PASSWORD_DATA' });
    }
    if (obj.confrimPassword && !obj.confirmPassword.match(passwordRegex)) {
      return res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    }
    if (obj.confrimNewPassword && !obj.confirmPassword.match(passwordRegex)) {
      return res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    }
    if (obj.NewPassword && !obj.confirmPassword.match(passwordRegex)) {
      return res.status(401).send({ message: 'INCORRECT_CONFIRM_PASSWORD_DATA' });
    }
    next();
    return true;
  }

  static person(req = this.req, res = this.res, next = this.next): Response | boolean {
    const obj = req.body;
    const phoneReg = /([+]?\d{1,2}[.-s]?)?(\d{3}[.-]?){2}\d{4}/g;
    const emailReg =
      /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

    if (obj.fname.length < 2 || obj.fname.length > 30 || !obj.fname) {
      return res.status(401).send({ message: 'INCORRECT_FNAME_DATA' });
    }
    if (obj.lname.length < 2 || obj.lname.length > 30) {
      return res.status(401).send({ message: 'INCORRECT_LNAME_DATA' });
    }
    if (obj.age < 18 || obj.age > 120 || !obj.age) {
      return res.status(401).send({ message: 'INCORRECT_AGE_DATA' });
    }
    if (obj.city.length < 2 || obj.city.length > 30) {
      return res.status(401).send({ message: 'INCORRECT_CITY_DATA' });
    }
    if (!obj.phoneNumber.match(phoneReg)) {
      return res.status(401).send({ message: 'INCORRECT_PHONE_NUMBER_DATA' });
    }
    if (!obj.email.match(emailReg)) {
      return res.status(401).send({ message: 'INCORRECT_EMAIL_DATA' });
    }
    if (obj.companyName.length < 3 || obj.companyName.length > 30) {
      return res.status(401).send({ message: 'INCORRECT_COMPANY_NAME_DATA' });
    }
    next();
    return true;
  }
}
