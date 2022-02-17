import { collectData, setTextValue } from '../../../utils/ts/utils';

export function changeUserLogin() {
  const data = collectData('changeLoginForm');

  fetch('/auth/change-login', {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return false;
    }

    if (response.status === 401) {
      setTextValue('change-login-password-message', '*Wrong password');
    }

    if (response.status === 403) {
      setTextValue('change-login-message', '*Login already in use');
    }

    if (response.status === 409) {
      setTextValue('change-login-message', '*Try again later');
    }
  });
}
