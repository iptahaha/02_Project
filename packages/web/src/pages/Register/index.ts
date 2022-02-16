import '../../utils/styles/authPage.scss';
import {
  addListener,
  changeInterfaceState,
  checkLocalStorageValue,
  showOrHidePassword,
  validateStatusCheck,
} from '../../utils/ts/utils';
import { confirmPasswordValidate, loginValidate, passwordValidate, sendRegister} from './logic';
import { changeLng } from '../../utils/ts/localization';

function initRegister() {
  const state = {
    urlRegister: '/auth/register',
    validateStatus: [false, false, false],
  };

  checkLocalStorageValue('changeTheme');
  checkLocalStorageValue('changeLng');

  addListener('sign-up-login', 'input', () => {
    loginValidate.call(null, state);
    validateStatusCheck.call(null, state, 'create-account');
  });
  addListener('sign-up-password', 'input', () => {
    passwordValidate.call(null, state);
    confirmPasswordValidate.call(null, state);
    validateStatusCheck.call(null, state, 'create-account');
  });

  addListener('sign-up-confirm-password', 'input', () => {
    confirmPasswordValidate.call(null, state);
    validateStatusCheck.call(null, state, 'create-account');
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
