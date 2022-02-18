import { changeUserLoginRequest, changeUserPasswordRequest, collectData } from '../../../utils/ts/utils';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../../utils/validation/baseValidation';

export function changeUserLogin(state) {
  if (
    loginValidate(state, 0, 'change-login-message', 'update-login') === false ||
    passwordValidate(state, 1, 'change-login-password-message', 'update-login-password') === false
  ) {
    return false;
  }

  const data = collectData('changeLoginForm');
  changeUserLoginRequest(data);
  return true;
}

export function changeUserPassword(state) {
  if (
    passwordValidate(state, 0, 'change-password-message', 'update-password') === false ||
    passwordValidate(state, 1, 'change-new-password-message', 'update-new-password') === false ||
    confirmPasswordValidate(
      state,
      2,
      'change-confirm-password-message',
      'update-new-password',
      'update-confirm-new-password',
    ) === false
  ) {
    return false;
  }

  const data = collectData('changePasswordForm');
  changeUserPasswordRequest(data);
  return true;
}
