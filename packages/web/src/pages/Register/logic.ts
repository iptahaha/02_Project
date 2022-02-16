import {
  collectData,
  getElement,
  getInputValue,
  hasAttribute,
  removeDisabledAttribute,
  setDisabledAttribute,
  setAttribute,
  removeAttribute
} from '../../utils/ts/utils';
import { updateContent } from '../../utils/ts/localization';

export function loginValidate(state): boolean {
  const loginRegex = /^[a-zA-Z0-9_]*$/;
  const value = <string>getInputValue('sign-up-login');
  const loginErrorId = 'login-message';

  if (value === '') {
    setAttribute(loginErrorId, 'data-i18n', 'login-empty');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (!value.match(loginRegex)) {
    setAttribute(loginErrorId, 'data-i18n', 'login-contains');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (value.length < 6) {
    setAttribute(loginErrorId, 'data-i18n', 'login-short');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (value.length > 20) {
    setAttribute(loginErrorId, 'data-i18n', 'login-long');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  removeAttribute(loginErrorId, 'data-i18n');
  state.validateStatus[0] = true;
  updateContent();
  return true;
}

export function passwordValidate(state): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).*$/;
  const value = <string>getInputValue('sign-up-password');
  const passwordErrorId = 'password-message';

  if (value === '') {
    setAttribute(passwordErrorId, 'data-i18n', 'error.pass-empty');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  if (value.length < 8) {
    setAttribute(passwordErrorId, 'data-i18n', 'error.pass-short');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  if (!value.match(passwordRegex)) {
    setAttribute('password-message', 'data-i18n', 'error.pass-contains');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  removeAttribute(passwordErrorId, 'data-i18n');
  state.validateStatus[1] = true;
  updateContent();
  return true;
}

export function confirmPasswordValidate(state): boolean {
  const valuePassword = <string>getInputValue('sign-up-password');
  const valueConfirmPassword = <string>getInputValue('sign-up-confirm-password');
  const confirmPasswordErrorId = 'confirm-password-message';

  if (valueConfirmPassword !== valuePassword) {
    setAttribute(confirmPasswordErrorId, 'data-i18n', 'error.pass-not_match');
    state.validateStatus[2] = false;
    updateContent();
    return false;
  }

  removeAttribute(confirmPasswordErrorId, 'data-i18n');
  state.validateStatus[2] = true;
  updateContent();
  return true;
}

export function validateStatusCheck(state): boolean {
  const button = <HTMLElement>getElement('create-account');
  if (state.validateStatus.includes(false)) {
    if (!hasAttribute(button, 'disabled')) {
      setDisabledAttribute(button);
    }
    return false;
  }
  removeDisabledAttribute(button);
  return true;
}

export function sendRegister(state): boolean {
  if (
    loginValidate(state) === false ||
    passwordValidate(state) === false ||
    confirmPasswordValidate(state) === false
  ) {
    return false;
  }

  const data = collectData('register-form');

  fetch(state.urlRegister, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.status === 401) {
        setAttribute('login-message', 'data-i18n', 'error.login-in_use');
        updateContent();
      }

      if (response.status === 409) {
        setAttribute('global-message', 'data-i18n', 'error.try-later');
        updateContent();
      }

      if (response.status === 403) {
        setAttribute('confirm-password-message', 'data-i18n', 'error.pass-not_match');
        updateContent();
      }

      if (response.redirected) {
        window.location.href = response.url;
      }

      return true;
    })
    .catch((err) => {
      console.log(err);
    });
}
