import {
  collectData,
  getElement,
  getInputValue,
  setInputValue,
  setTextValue,
} from '../../utils/ts/utils';

export function loginValidate(state) {
  const loginRegex = /^[a-zA-Z0-9_]{6,20}$/;
  const value = <string>getInputValue('login-in-login');
  const loginId = 'login-message';

  if (value === '') {
    setTextValue(loginId, '*You need login');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length < 6) {
    setTextValue(loginId, '*Login at least 6 characters');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length > 20) {
    setTextValue(loginId, '*Login can`t be longer than 20 characters');
    state.validateStatus[0] = false;
    return false;
  }

  if (!value.match(loginRegex)) {
    setTextValue(loginId, '*Login must contain only letters, numbers, and underscores');
    state.validateStatus[0] = false;
    return false;
  }

  setTextValue(loginId, '');
  state.validateStatus[0] = true;
  return true;
}

export function passwordValidate(state) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const value = <string>getInputValue('login-in-password');
  const passwordId = 'password-message';

  if (value === '') {
    setTextValue(passwordId, '*You need password');
    state.validateStatus[1] = false;
    return false;
  }

  if (value.length < 8) {
    setTextValue(passwordId, '*Password at least 8 characters');
    state.validateStatus[1] = false;
    return false;
  }

  if (!value.match(passwordRegex)) {
    setTextValue(passwordId, '*Password must contain letters, numbers, and special symbols');
    state.validateStatus[1] = false;
    return false;
  }

  setTextValue(passwordId, '');
  state.validateStatus[1] = true;
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
        setTextValue(globalErrorId, 'Try again later');
      }

      if (response.status === 403) {
        setTextValue('login-message', 'You need login and password');
        setTextValue('password-message', 'You need login and password');
      }

      if (response.status === 401) {
        setTextValue(globalErrorId, 'Wrong login or password');
      }

      return true;
    })
    .catch(() => {
      setTextValue(globalErrorId, 'Try again later');
      return false;
    });
  return true;
}
