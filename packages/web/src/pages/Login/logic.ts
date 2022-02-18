import { collectData, setInputValue, setAttribute } from '../../utils/ts/utils';
import { updateContent } from '../../utils/ts/localization';
import { loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

export function loginIn(state) {
  if (
    loginValidate(state, 0, 'login-message', 'login-in-login') === false ||
    passwordValidate(state, 1, 'password-message', 'login-in-password') === false
  ) {
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
        return true;
      }

      return response.json();
    })
    .then((value) => {
      if (value.message === 'EMPTY_LOGIN_PASSWORD') {
        setAttribute('login-message', 'data-i18n', 'error.login-empty');
        setAttribute('password-message', 'data-i18n', 'error.pass-empty');
      }

      if (value.message === 'WRONG_LOGIN_PASSWORD') {
        setAttribute(globalErrorId, 'data-i18n', 'error.login/pass-wrong');
      }

      if (value.message === 'CONNECTION_ERROR') {
        setAttribute(globalErrorId, 'data-i18n', 'error.login/pass-wrong');
      }

      updateContent();
    })
    .catch((err) => {
      console.log(err);
      setAttribute(globalErrorId, 'data-i18n', 'error.try-later');
      updateContent();
      return false;
    });
  return true;
}
