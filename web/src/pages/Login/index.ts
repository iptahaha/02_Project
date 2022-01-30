import "../../components/styles/styles.scss"
import '../../components/ts/utilts.ts'
import {addListener, getForm, getInputValue, setTextValue} from "../../components/ts/utilts";

document.addEventListener('DOMContentLoaded', function(){
  initRegister()
})

function initRegister() {

  const state = {
    urlLoginIn: 'http://localhost:3000/auth/login'
  }

  addListener('button-sign-in', 'click', loginForm.bind(null, state))
}



function loginForm(state) {
  const data = new URLSearchParams();
  for (let values of new FormData(<HTMLFormElement>getForm('login-form'))) {
    data.append(values[0], <string>values[1]);
  }

  fetch(state.urlLoginIn, {
    method: 'POST',
    body: data
  })
    .then(response => {

      if (response.status === 409) {
        setTextValue('error-register-text', 'Try again later')
      }

      if (response.status === 403) {
        setTextValue('error-register-text', 'Wrong login or password')
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
