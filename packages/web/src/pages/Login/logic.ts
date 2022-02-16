import {
  collectData,
  getElement,
  getInputValue,
  setInputValue,
  setAttribute,
  removeAttribute
} from '../../utils/ts/utils';
import { updateContent } from "../../utils/ts/localization";

export function loginValidate(state) {
  const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
  const value = <string>getInputValue('login-in-login');
  const loginId = 'login-message';

  if (value === '') {
    setAttribute(loginId, 'data-i18n', 'error.login-empty');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (value.length < 6) {
    setAttribute(loginId, 'data-i18n', 'error.login-short');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (value.length > 20) {
    setAttribute(loginId, 'data-i18n', 'error.login-long');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  if (!value.match(loginRegex)) {
    setAttribute(loginId, 'data-i18n', 'error.login-contains');
    state.validateStatus[0] = false;
    updateContent();
    return false;
  }

  removeAttribute(loginId, 'data-i18n');
  state.validateStatus[0] = true;
  updateContent();
  return true;
}

export function passwordValidate(state) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const value = <string>getInputValue('login-in-password');
  const passwordId = 'password-message';

  if (value === '') {
    setAttribute(passwordId, 'data-i18n', 'error.pass-empty');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  if (value.length < 8) {
    setAttribute(passwordId, 'data-i18n', 'error.pass-short');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  if (!value.match(passwordRegex)) {
    setAttribute(passwordId, 'data-i18n', 'error.pass-contains');
    state.validateStatus[1] = false;
    updateContent();
    return false;
  }

  removeAttribute(passwordId, 'data-i18n');
  state.validateStatus[1] = true;
  updateContent();
  return true;
}

export function validateStatusCheck(state): boolean {
  const button = <HTMLElement>getElement('login-in');
  if (state.validateStatus.includes(false)) {
    if (!button.hasAttribute('disabled')) {
      button.setAttribute('disabled', 'disabled');
    }
    return false;
  }
  button.removeAttribute('disabled');
  return true;
}

export function loginIn(state) {
  if (loginValidate(state) === false || passwordValidate(state) === false) {
    return false;
  }

  const data = collectData('login-form');
  const globalErrorId = 'global-message';

  fetch(state.url, {
    method: 'POST',
    body: data,
  })
    .then((response) => {

      if (response.redirected) {
        setInputValue('login-in-login', '');
        window.location.href = response.url;
      }

      if (response.status === 409) {
        setAttribute(globalErrorId, 'data-i18n', 'error.try-later');
        updateContent();
      }

      if (response.status === 403) {
        setAttribute('login-message', 'data-i18n', 'error.login-empty');
        setAttribute('password-message', 'data-i18n', 'error.pass-empty');
        updateContent();
      }

      if (response.status === 401) {
        setAttribute(globalErrorId, 'data-i18n', 'error.login/pass-wrong');
        updateContent();
      }

      return true;
    })
    .catch(() => {
      setAttribute(globalErrorId, 'data-i18n', 'error.try-later');
      updateContent();
      return false;
    });
  return true;
}
