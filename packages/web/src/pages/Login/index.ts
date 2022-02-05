import '../../utils/styles/authPage.scss';
import {
  addListener,
  changeInterfaceState,
  checkLocalStorageValue,
  showOrHidePassword,
} from '../../utils/ts/utils';
import { loginIn, loginValidate, passwordValidate, validateStatusCheck } from './logic';
import { changeLng } from '../../utils/ts/localization';

document.addEventListener('DOMContentLoaded', () => {
  initRegister();
});

function initRegister() {
  const state = {
    url: '/auth/login',
    validateStatus: [false, false],
  };

  checkLocalStorageValue('changeTheme');

  addListener('login-in-login', 'input', () => {
    loginValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });
  addListener('login-in-password', 'input', () => {
    passwordValidate.call(null, state);
    validateStatusCheck.call(null, state);
  });

  addListener(
    'password-hide',
    'click',
    showOrHidePassword.bind(null, 'password-hide', 'login-in-password'),
  );
  addListener('login-in', 'click', loginIn.bind(null, state));

  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}
