export function logout() {
  fetch('/auth/logout', {
    method: 'DELETE',
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return true;
    }
  });
}
