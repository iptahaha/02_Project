import { addMatch, valueLength } from '../../../utils/ts/utils';

export function validatePersonForm(obj): string[] {
  const errorField: string[] = [];
  const phoneReg = /([+]?\d{1,2}[.-s]?)?(\d{3}[.-]?){2}\d{4}/g;
  const emailReg =
    /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

  if (valueLength(obj.fname) < 2 || valueLength(obj.fname) > 30 || !valueLength(obj.fname)) {
    errorField.push('<span data-i18n="error.modal.first_name"></span>');
  }

  if (valueLength(obj.lname) < 2 || valueLength(obj.lname) > 30) {
    errorField.push('<span data-i18n="error.modal.last_name"></span>');
  }

  if (obj.age < 18 || obj.age > 120 || !obj.age) {
    errorField.push('<span data-i18n="error.modal.age"></span>');
  }

  if (valueLength(obj.city) < 2 || valueLength(obj.city) > 30) {
    errorField.push('<span data-i18n="error.modal.city"></span>');
  }

  if (!addMatch(obj.phoneNumber, phoneReg)) {
    errorField.push('<span data-i18n="error.modal.phone_number"></span>');
  }

  if (!addMatch(obj.email, emailReg)) {
    errorField.push('<span data-i18n="error.modal.email"></span>');
  }

  if (valueLength(obj.companyName) < 3 || valueLength(obj.companyName) > 30) {
    errorField.push('<span data-i18n="error.modal.company"></span>');
  }

  return errorField;
}
