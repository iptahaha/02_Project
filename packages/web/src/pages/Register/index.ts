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

export function initRegister() {
  const state = {
    urlRegister: '/auth/register',
  };

  const validateStatus = [false, false, false];

  checkLocalStorageThemeValue('changeTheme');
  checkLocalStorageLangValue('changeLanguage');

  addListener('sign-up-login', 'input', loginValidate.bind(null, validateStatus, 0, 'login-message', 'sign-up-login'));
  addListener('sign-up-login', 'input', validateStatusCheck.bind(null, validateStatus, 'create-account'));
  addListener(
    'sign-up-password',
    'input',
    passwordValidate.bind(null, validateStatus, 1, 'password-message', 'sign-up-password'),
  );
  addListener(
    'sign-up-password',
    'input',
    confirmPasswordValidate.bind(
      null,
      validateStatus,
      2,
      'confirm-password-message',
      'sign-up-password',
      'sign-up-confirm-password',
    ),
  );
  addListener('sign-up-password', 'input', validateStatusCheck.bind(null, validateStatus, 'create-account'));

  addListener(
    'sign-up-confirm-password',
    'input',
    confirmPasswordValidate.bind(
      null,
      validateStatus,
      2,
      'confirm-password-message',
      'sign-up-password',
      'sign-up-confirm-password',
    ),
  );
  addListener('sign-up-confirm-password', 'input', validateStatusCheck.bind(null, validateStatus, 'create-account'));

  addListener('password-hide', 'click', showOrHidePassword.bind(null, 'password-hide', 'sign-up-password'));
  addListener(
    'confirm-password-hide',
    'click',
    showOrHidePassword.bind(null, 'confirm-password-hide', 'sign-up-confirm-password'),
  );

  addListener('create-account', 'click', sendRegister.bind(null, state));
  addListener('dropdownTheme', 'change', changeInterfaceState);
  addListener('dropdownLanguage', 'change', changeLng);
}

document.addEventListener('DOMContentLoaded', initRegister.bind(null));
