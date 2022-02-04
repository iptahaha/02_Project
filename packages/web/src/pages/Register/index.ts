import '../../utils/styles/styles.scss';
import {
  addListener,
  collectData,
  getElement,
  getInputValue,
  setTextValue,
  showOrHidePassword,
} from '../../utils/ts/utils';

document.addEventListener('DOMContentLoaded', () => {
  initRegister();
});

function initRegister() {
  const state = {
    urlRegister: '/auth/register',
    validateStatus: [false, false, false],
  };

  addListener('sign-up-login', 'input', loginValidate.bind(null, state));
  addListener('sign-up-password', 'input', passwordValidate.bind(null, state));
  addListener('sign-up-password', 'input', confirmPasswordValidate.bind(null, state));
  addListener('sign-up-confirm-password', 'input', confirmPasswordValidate.bind(null, state));
  addListener('sign-up-login', 'input', validateStatusCheck.bind(null, state));
  addListener('sign-up-password', 'input', validateStatusCheck.bind(null, state));
  addListener('sign-up-confirm-password', 'input', validateStatusCheck.bind(null, state));

  addListener(
    'password-hide',
    'click',
    showOrHidePassword.bind(null, 'password-hide', 'sign-up-password'),
  );
  addListener(
    'confirm-password-hide',
    'click',
    showOrHidePassword.bind(null, 'confirm-password-hide', 'sign-up-confirm-password'),
  );

  addListener('create-account', 'click', sendRegister.bind(null, state));
}

function loginValidate(state): boolean {
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

function passwordValidate(state): boolean {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const value = <string>getInputValue('sign-up-password');
  const passwordErrorId = 'password-message'

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

  setTextValue('password-message', '');
  state.validateStatus[1] = true;
  return true;
}

function confirmPasswordValidate(state): boolean {
  const valuePassword = <string>getInputValue('sign-up-password');
  const valueConfirmPassword = <string>getInputValue('sign-up-confirm-password');

  if (valueConfirmPassword !== valuePassword) {
    setTextValue('confirm-password-message', '*Password and confirm password does not match');
    state.validateStatus[2] = false;
    return false;
  }

  setTextValue('confirm-password-message', '');
  state.validateStatus[2] = true;
  return true;
}

function validateStatusCheck(state): boolean {
  const button = <HTMLElement>getElement('create-account');
  if (state.validateStatus.includes(false)) {
    if (!button.hasAttribute('disabled')) {
      button.setAttribute('disabled', 'disabled');
    }
    return false;
  }
  button.removeAttribute('disabled');
  return true;
}

function sendRegister(state): boolean {
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
