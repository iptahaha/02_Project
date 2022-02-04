import '../../utils/styles/styles.scss';
import { addListener, showOrHidePassword } from '../../utils/ts/utilts';
import { loginIn, loginValidate, passwordValidate, validateStatusCheck } from './logic';

document.addEventListener('DOMContentLoaded', () => {
  initRegister();
});

function initRegister() {
  const state = {
    url: '/auth/login',
    validateStatus: [false, false],
  };

  addListener('login-in-login', 'input', loginValidate.bind(null, state));
  addListener('login-in-password', 'input', passwordValidate.bind(null, state));

  addListener('login-in-login', 'input', validateStatusCheck.bind(null, state));
  addListener('login-in-password', 'input', validateStatusCheck.bind(null, state));

  addListener(
    'password-hide',
    'click',
    showOrHidePassword.bind(null, 'password-hide', 'login-in-password'),
  );
  addListener('login-in', 'click', loginIn.bind(null, state));
}
