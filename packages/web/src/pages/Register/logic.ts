import {
  collectData,
  getElement,
  getInputValue,
  hasAttribute,
  removeDisabledAttribute,
  setDisabledAttribute,
  setTextValue,
} from '../../utils/ts/utils';

export function loginValidate(state): boolean {
  const loginRegex = /^[a-zA-Z0-9_]*$/;
  const value = <string>getInputValue('sign-up-login');
  const loginErrorId = 'login-message';

  if (value === '') {
    setTextValue(loginErrorId, '*You need login');
    state.validateStatus[0] = false;
    return false;
  }

  if (!value.match(loginRegex)) {
    setTextValue(loginErrorId, '*Login must contain only letters, numbers, and underscores');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length < 6) {
    setTextValue(loginErrorId, '*Login at least 6 characters');
    state.validateStatus[0] = false;
    return false;
  }

  if (value.length > 20) {
    setTextValue(loginErrorId, '*Login can`t be longer than 20 characters');
    state.validateStatus[0] = false;
    return false;
  }

  setTextValue(loginErrorId, '');
  state.validateStatus[0] = true;
  return true;
}

export function passwordValidate(state): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).*$/;
  const value = <string>getInputValue('sign-up-password');
  const passwordErrorId = 'password-message';

  if (value === '') {
    setTextValue(passwordErrorId, '*You need password');
    state.validateStatus[1] = false;
    return false;
  }

  if (value.length < 8) {
    setTextValue(passwordErrorId, '*Password at least 8 characters');
    state.validateStatus[1] = false;
    return false;
  }

  if (!value.match(passwordRegex)) {
    setTextValue(
      'password-message',
      '*Password must contain letters, numbers, and special symbols',
    );
    state.validateStatus[1] = false;
    return false;
  }

  setTextValue(passwordErrorId, '');
  state.validateStatus[1] = true;
  return true;
}

export function confirmPasswordValidate(state): boolean {
  const valuePassword = <string>getInputValue('sign-up-password');
  const valueConfirmPassword = <string>getInputValue('sign-up-confirm-password');
  const confirmPasswordErrorId = 'confirm-password-message';

  if (valueConfirmPassword !== valuePassword) {
    setTextValue(confirmPasswordErrorId, '*Password and confirm password does not match');
    state.validateStatus[2] = false;
    return false;
  }

  setTextValue(confirmPasswordErrorId, '');
  state.validateStatus[2] = true;
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
        setTextValue('login-message', '*Login already in use');
      }

      if (response.status === 409) {
        setTextValue('global-message', 'Try again later');
      }

      if (response.status === 403) {
        setTextValue('confirm-password-message', '*Password and confirm password does not match');
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
