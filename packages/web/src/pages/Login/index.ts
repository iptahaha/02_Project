import '../../utils/styles/authPage.scss';
import {
  addListener,
  changeInterfaceState,
  checkLocalStorageThemeValue,
  showOrHidePassword,
  validateStatusCheck,
} from '../../utils/ts/utils';
import { loginIn } from './logic';
import { changeLng, checkLocalStorageLangValue } from '../../utils/ts/localization';
import { loginValidate, passwordValidate } from '../../utils/validation/baseValidation';

function initRegister() {
  const state = {
    url: '/auth/login',
  };

  const validateStatus = [false, false];

  checkLocalStorageThemeValue('changeTheme');
  checkLocalStorageLangValue('changeLanguage');


  addListener('login-in-login', 'input', () => {
    loginValidate.call(null, validateStatus, 0, 'login-message', 'login-in-login');
    validateStatusCheck.call(null, validateStatus, 'login-in');
  });
  addListener('login-in-password', 'input', () => {
    passwordValidate.call(null, validateStatus, 1, 'password-message', 'login-in-password');
    validateStatusCheck.call(null, validateStatus, 'login-in');
  });

  addListener('password-hide', 'click', showOrHidePassword.bind(null, 'password-hide', 'login-in-password'));
  addListener('login-in', 'click', loginIn.bind(null, state));

  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}


document.addEventListener('DOMContentLoaded', () => {
  initRegister();
});
