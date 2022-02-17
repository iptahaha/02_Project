import { getInputValue, removeAttribute, setAttribute, setTextValue } from '../ts/utils';
import { updateContent } from '../ts/localization';

export function loginValidate(state, pos, loginMessageId, loginInputId) {
  const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
  const value = <string>getInputValue(loginInputId);

  if (value === '') {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-empty');
    state[pos] = false;
    updateContent();
    return false;
  }

  if (value.length < 6) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-short');
    state[pos] = false;
    updateContent();
    return false;
  }

  if (value.length > 20) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-long');
    state[pos] = false;
    updateContent();
    return false;
  }

  if (!value.match(loginRegex)) {
    setAttribute(loginMessageId, 'data-i18n', 'error.login-contains');
    state[pos] = false;
    updateContent();
    return false;
  }

  removeAttribute(loginMessageId, 'data-i18n');
  setTextValue(loginMessageId, '');
  state[pos] = true;
  return true;
}

export function passwordValidate(state, pos, passwordMessageId, passwordInputId) {
  console.log('aaa');
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const value = <string>getInputValue(passwordInputId);

  if (value === '') {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-empty');
    state[pos] = false;
    updateContent();
    return false;
  }

  if (value.length < 8) {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-short');
    state[pos] = false;
    updateContent();
    return false;
  }

  if (!value.match(passwordRegex)) {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-contains');
    state[pos] = false;
    updateContent();
    return false;
  }

  removeAttribute(passwordMessageId, 'data-i18n');
  setTextValue(passwordMessageId, '');
  state[pos] = true;
  return true;
}

export function confirmPasswordValidate(
  state,
  pos,
  passwordMessageId,
  passwordInputId,
  confirmPasswordInputId,
): boolean {

  const valuePassword = <string>getInputValue(passwordInputId);
  const valueConfirmPassword = <string>getInputValue(confirmPasswordInputId);
  if (valueConfirmPassword !== valuePassword) {
    setAttribute(passwordMessageId, 'data-i18n', 'error.pass-not_match');
    state[pos] = false;
    updateContent();
    return false;
  }

  removeAttribute(passwordMessageId, 'data-i18n');
  setTextValue(passwordMessageId, '');
  state[pos] = true;
  updateContent();
  return true;
}
