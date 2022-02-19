import { addFetchUrlRegister, collectData } from '../../utils/ts/utils';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

export function sendRegister(state: any): boolean {
  if (
    loginValidate(state, 0, 'login-message', 'sign-up-login') === false ||
    passwordValidate(state, 1, 'password-message', 'sign-up-password') === false ||
    confirmPasswordValidate(state, 2, 'confirm-password-message', 'sign-up-password', 'sign-up-confirm-password') ===
      false
  ) {
    return false;
  }

  const data = collectData('register-form');
  addFetchUrlRegister(state, data);
  return true;
}
