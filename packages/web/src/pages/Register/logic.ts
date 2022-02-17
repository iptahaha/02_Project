import {
  collectData,
  setAttribute,
} from '../../utils/ts/utils';
import { updateContent } from '../../utils/ts/localization';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

export function sendRegister(state): boolean {
  if (
    loginValidate(state, 0, 'login-message', 'sign-up-login') === false ||
    passwordValidate(state, 1, 'password-message', 'sign-up-password') === false ||
    confirmPasswordValidate(state, 2, 'confirm-password-message','sign-up-password','sign-up-confirm-password') === false
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
