import {
  collectData,
  removeDisabledAttributeByID,
  setDisabledAttributeByID,
  setTextValue,
} from '../../../utils/ts/utils';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../../utils/validation/baseValidation';
import { updateContent } from '../../../utils/ts/localization';

export function changeUserLoginRequest(data) {
  setDisabledAttributeByID('changeLoginButton');
  fetch('/auth/change-login', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return true;
      }

      return response.json();
    })
    .then((value) => {
      if (value.message === 'WRONG_LOGIN_PASSWORD') {
        setTextValue('change-login-password-message', '*Wrong password');
      }

      if (value.message === 'LOGIN_NOT_UNIQUE') {
        setTextValue('change-login-message', '*Login already in use');
      }

      if (value.message === 'CONNECTION_ERROR') {
        setTextValue('change-login-password-message', '*Try again later');
      }

      updateContent();
      removeDisabledAttributeByID('changeLoginButton');
      return false;
    })
    .catch(() => {
      removeDisabledAttributeByID('changeLoginButton')
      setTextValue('change-login-password-message', '*Try again later');
      updateContent();
    });
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
  setDisabledAttributeByID('changePasswordButton')
  fetch('/auth/change-password', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return true;
      }

      return response.json();
    })
    .then((value) => {
      if (value.message === 'WRONG_LOGIN_PASSWORD') {
        setTextValue('change-password-message', '*Wrong password');
      }

      if (value.message === 'CONFIRM_PASSWORD_ERROR') {
        setTextValue('change-new-password-message', '*Password and confirm password does not match');
        setTextValue('change-confirm-password-message', '*Password and confirm password does not match');
      }

      if (value.message === 'CONNECTION_ERROR') {
        setTextValue('change-confirm-password-message', '*Try again later');
      }

      removeDisabledAttributeByID('changePasswordButton');
      updateContent();
      return false;
    })
    .catch(() => {
      removeDisabledAttributeByID('changePasswordButton');
      setTextValue('change-confirm-password-message', '*Try again later');
      updateContent();
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
