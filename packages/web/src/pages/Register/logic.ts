import { collectData, setAttribute } from '../../utils/ts/utils';
import { updateContent } from '../../utils/ts/localization';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

export function sendRegister(state): boolean {
  if (
    loginValidate(state, 0, 'login-message', 'sign-up-login') === false ||
    passwordValidate(state, 1, 'password-message', 'sign-up-password') === false ||
    confirmPasswordValidate(state, 2, 'confirm-password-message', 'sign-up-password', 'sign-up-confirm-password') ===
      false
  ) {
    return false;
  }

  const data = collectData('register-form');

  fetch(state.urlRegister, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }

      return response.json();
    })
    .then((value) => {
      if (value.message === 'LOGIN_NOT_UNIQUE') {
        setAttribute('login-message', 'data-i18n', 'error.login-in_use');
      }

      if (value.message === 'CONNECTION_ERROR') {
        setAttribute('global-message', 'data-i18n', 'error.try-later');
      }

      if (value.message === 'CONFIRM_PASSWORD_ERROR') {
        setAttribute('confirm-password-message', 'data-i18n', 'error.pass-not_match');
      }

      updateContent();
    })
    .catch(() => {
      setAttribute('global-message', 'data-i18n', 'error.try-later');
      updateContent();
    });
}
