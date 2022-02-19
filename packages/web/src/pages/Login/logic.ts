import { collectData, getFetchLogic } from '../../utils/ts/utils';
import { loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

export function loginIn(state) {
  if (
    loginValidate(state, 0, 'login-message', 'login-in-login') === false ||
    passwordValidate(state, 1, 'password-message', 'login-in-password') === false
  ) {
    return false;
  }

  const data = collectData('login-form');
  const globalErrorId = 'global-message';

  getFetchLogic(state, data, globalErrorId);
  return true;
}
