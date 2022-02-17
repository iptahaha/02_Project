import '../../utils/styles/authPage.scss';
import {
  addListener,
  changeInterfaceState,
  checkLocalStorageThemeValue,
  showOrHidePassword,
  validateStatusCheck,
} from '../../utils/ts/utils';
import { sendRegister } from './logic';
import { changeLng, checkLocalStorageLangValue } from '../../utils/ts/localization';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

function initRegister() {
  const state = {
    urlRegister: '/auth/register',
  };

  const validateStatus = [false, false, false];

  checkLocalStorageThemeValue('changeTheme');
  checkLocalStorageLangValue('changeLanguage');

  addListener('sign-up-login', 'input', () => {
    loginValidate.call(null, validateStatus, 0, 'login-message', 'sign-up-login');
    validateStatusCheck.call(null, validateStatus, 'create-account');
  });
  addListener('sign-up-password', 'input', () => {
    passwordValidate.call(null, validateStatus, 1, 'password-message', 'sign-up-password');
    confirmPasswordValidate.call(
      null,
      validateStatus,
      2,
      'confirm-password-message',
      'sign-up-password',
      'sign-up-confirm-password',
    );
    validateStatusCheck.call(null, validateStatus, 'create-account');
  });

  addListener('sign-up-confirm-password', 'input', () => {
    confirmPasswordValidate.call(
      null,
      validateStatus,
      2,
      'confirm-password-message',
      'sign-up-password',
      'sign-up-confirm-password',
    );
    validateStatusCheck.call(null, validateStatus, 'create-account');
  });

  addListener('password-hide', 'click', showOrHidePassword.bind(null, 'password-hide', 'sign-up-password'));
  addListener(
    'confirm-password-hide',
    'click',
    showOrHidePassword.bind(null, 'confirm-password-hide', 'sign-up-confirm-password'),
  );

  addListener('create-account', 'click', sendRegister.bind(null, state));
  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}

document.addEventListener('DOMContentLoaded', () => {
  initRegister();
});
