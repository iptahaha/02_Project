import "../../components/styles/styles.scss"
import {addListener, getForm, getInputValue, setTextValue} from "../../components/ts/utilts";

document.addEventListener('DOMContentLoaded', function(){
  initRegister()
})

function initRegister() {

  const state = {
    urlRegister: 'http://localhost:3000/auth/register'
  }

  addListener('button-create-account', 'click', registerForm.bind(null, state))
}



function registerForm(state) {
  event.preventDefault()

  const login = getInputValue('sign-up-login');
  const password = getInputValue('sign-up-password');
  const repeatPassword = getInputValue('sign-up-repeat-password');

  if (login === undefined || password === undefined || repeatPassword === undefined) {
    setTextValue('error-register-text', 'You need login and password')
    return false;
  }

  if (password !== repeatPassword) {
    setTextValue('error-register-text', 'Passwords do not match')
    return false;
  }


  const data = new URLSearchParams();
  for (let values of new FormData(<HTMLFormElement>getForm('register-form'))) {
    data.append(values[0], <string>values[1]);
  }

  fetch(state.urlRegister, {
    method: 'POST',
    body: data
  }).then(response => {

    if (response.status === 401) {
      setTextValue('error-register-text', 'Passwords do not match')
    }

    if (response.status === 409) {
      setTextValue('error-register-text', 'Try again later')
    }

    if (response.status === 403) {
      setTextValue('error-register-text', 'Login already in use')
    }


    if (response.redirected) {
      console.log('test')
      window.location.href = response.url;
    }


  })
    .catch((err) => {
      console.log(err)
    })
}
