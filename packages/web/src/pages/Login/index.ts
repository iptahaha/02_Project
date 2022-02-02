import "../../utils/styles/styles.scss"
import {
    addListener,
    collectData,
    getElement,
    getInputValue,
    setTextValue,
    showOrHidePassword
} from "../../utils/ts/utilts";

document.addEventListener('DOMContentLoaded', function () {
    initRegister()
})

function initRegister() {

    const state = {
        urlLoginIn: '/auth/login',
        validateStatus: [false,false]
    }

    addListener('login-in-login', 'input', loginValidate.bind(null, state))
    addListener('login-in-password', 'input', passwordValidate.bind(null, state))

    addListener('login-in-login', 'input', validateStatusCheck.bind(null, state))
    addListener('login-in-password', 'input', validateStatusCheck.bind(null, state))

    addListener('password-hide', 'click', showOrHidePassword.bind(null, 'password-hide', 'login-in-password'))
    addListener('login-in', 'click', loginIn.bind(null, state))
}

function loginValidate(state) {
    const loginRegex = /^[a-zA-Z0-9_]{6,20}$/
    const value = <string>getInputValue('login-in-login')

    if (value === '') {
        setTextValue('login-message', '*You need login')
        state.validateStatus[0] = false;
        return false;
    }

    if (value.length < 6) {
        setTextValue('login-message', '*Login at least 6 characters')
        state.validateStatus[0] = false;
        return false;
    }

    if (value.length > 20) {
        setTextValue('login-message', '*Login can`t be longer than 20 characters')
        state.validateStatus[0] = false;
        return false;
    }

    if (!value.match(loginRegex)) {
        setTextValue('login-message', '*Login must contain only letters, numbers, and underscores')
        state.validateStatus[0] = false;
        return false
    }

    setTextValue('login-message', '')
    state.validateStatus[0] = true;
    return true;
}

function passwordValidate(state) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const value = <string>getInputValue('login-in-password')

    if (value === '') {
        setTextValue('password-message', '*You need password')
        state.validateStatus[1] = false;
        return false;
    }

    if (value.length < 8) {
        setTextValue('password-message', '*Password at least 8 characters')
        state.validateStatus[1] = false;
        return false;
    }

    if (!value.match(passwordRegex)) {
        setTextValue('password-message', '*Password must contain letters, numbers, and special symbols')
        state.validateStatus[1] = false;
        return false
    }

    setTextValue('password-message', '')
    state.validateStatus[1] = true;
    return true;
}

function validateStatusCheck(state): boolean {
    const button = <HTMLElement>getElement('login-in');
    if (state.validateStatus.includes(false)) {

        if (!button.hasAttribute('disabled')) {
            button.setAttribute('disabled','disabled');
        }
        return false;
    } else {
        button.removeAttribute('disabled');
        return true;
    }
}

function loginIn(state) {
    if (loginValidate(state) === false || passwordValidate(state) === false) {
        return false;
    }

    const data = collectData('login-form');

    fetch(state.urlLoginIn, {
        method: 'POST',
        body: data
    })
        .then(response => {

            if (response.status === 409) {
                setTextValue('error-register-text', 'Try again later');
            }

            if (response.status === 403) {
                setTextValue('login-message', 'You need login and password');
                setTextValue('password-message', 'You need login and password');
            }

            if (response.status === 401) {
                setTextValue('global-message', 'Wrong login or password');
            }

            if (response.redirected) {
                window.location.href = response.url;
            }
            return true;
        })
        .catch((err) => {
            setTextValue('global-message', 'Try again later')
        })
}






