import { collectData, setTextValue } from '../../../utils/ts/utils';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../../utils/validation/baseValidation';

export function changeUserLoginRequest(data) {
  fetch('/auth/change-login', {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return false;
    }

    if (response.status === 401) {
      setTextValue('change-login-password-message', '*Wrong password');
    }

    if (response.status === 403) {
      setTextValue('change-login-message', '*Login already in use');
    }

    if (response.status === 409) {
      setTextValue('change-login-message', '*Try again later');
    }
    return true;
  });
  return true;
}

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

export function changeUserPasswordRequest(data) {
  fetch('/auth/change-password', {
    method: 'POST',
    body: data,
  });
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
