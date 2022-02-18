import '../../utils/styles/authPage.scss';
import {
  addListener,
  changeInterfaceState,
  checkLocalStorageThemeValue,
  showOrHidePassword,
  validateStatusCheck,
} from '../../utils/ts/utils';
import { changeLng, checkLocalStorageLangValue } from '../../utils/ts/localization';
import { loginValidate, passwordValidate } from '../../utils/validation/baseValidation';
import { loginIn } from './logic';

export function initLogin() {
  const state = {
    url: '/auth/login',
    validateStatus: [false, false],
  };

  const validateStatus = [false, false];

  checkLocalStorageThemeValue('changeTheme');
  checkLocalStorageLangValue('changeLanguage');

  addListener(
    'login-in-login',
    'input',
    loginValidate.bind(null, validateStatus, 0, 'login-message', 'login-in-login'),
  );

  addListener('login-in-login', 'input', validateStatusCheck.bind(null, validateStatus, 'login-in'));
  addListener('login-in-password', 'input', passwordValidate.bind(null, validateStatus, 1, 'password-message', 'login-in-password'));
  addListener('login-in-password', 'input', validateStatusCheck.bind(null, validateStatus, 'login-in'));

  addListener('password-hide', 'click', showOrHidePassword.bind(null, 'password-hide', 'login-in-password'));
  addListener('login-in', 'click', loginIn.bind(null, state));

  addListener('dropdownTheme', 'change', changeInterfaceState);
  addListener('dropdownLanguage', 'change', changeLng);
}

document.addEventListener('DOMContentLoaded', initLogin.bind(null));
