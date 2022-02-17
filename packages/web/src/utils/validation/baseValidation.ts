import { getInputValue, removeAttribute, setAttribute, setTextValue } from '../ts/utils';
import { updateContent } from '../ts/localization';

export function loginValidate(state, loginMessageId, loginInputId) {
  const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
  const value = <string>getInputValue(loginInputId);

  if (value === '') {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-empty');
    state[0] = false;
    updateContent();
    return false;
  }

  if (value.length < 6) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-short');
    state[0] = false;
    updateContent();
    return false;
  }

  if (value.length > 20) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-long');
    state[0] = false;
    updateContent();
    return false;
  }

  if (!value.match(loginRegex)) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-contains');
    state[0] = false;
    updateContent();
    return false;
  }

  removeAttribute(loginMessageId, 'data-i18n');
  setTextValue(loginMessageId, '');
  state[0] = true;
  return true;
}

export function passwordValidate(state, passwordMessageId, passwordInputId) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const value = <string>getInputValue(passwordInputId);

  if (value === '') {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-empty');
    state[1] = false;
    updateContent();
    return false;
  }

  if (value.length < 8) {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-short');
    state[1] = false;
    updateContent();
    return false;
  }

  if (!value.match(passwordRegex)) {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-contains');
    state[1] = false;
    updateContent();
    return false;
  }

  removeAttribute(passwordMessageId, 'data-i18n');
  setTextValue(passwordMessageId, '');
  state[1] = true;
  return true;
}
