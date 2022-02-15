export function validatePersonForm(obj): string[] {
  const errorField: string[] = [];
  const phoneReg = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g;
  const emailReg =
    /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

  if (obj.fname.length < 2 || obj.fname.length > 30 || !obj.fname) {
    errorField.push('first name');
  }

  if (obj.lname.length < 2 || obj.lname.length > 30) {
    errorField.push('last name');
  }

  if (obj.age < 18 || obj.age > 120 || !obj.age) {
    errorField.push('age');
  }

  if (obj.city.length < 2 || obj.city.length > 30) {
    errorField.push('city');
  }

  if (!obj.phoneNumber.match(phoneReg)) {
    errorField.push('phone number');
  }

  if (!obj.email.match(emailReg)) {
    errorField.push('email');
  }

  if (obj.companyName.length < 3 || obj.companyName.length > 30) {
    errorField.push('company');
  }

  return errorField;
}
