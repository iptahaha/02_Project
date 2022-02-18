"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegister = void 0;
require("../../utils/styles/authPage.scss");
const utils_1 = require("../../utils/ts/utils");
const logic_1 = require("./logic");
const localization_1 = require("../../utils/ts/localization");
const baseValidation_1 = require("../../utils/validation/baseValidation");
function initRegister() {
    const state = {
        urlRegister: '/auth/register',
    };
    const validateStatus = [false, false, false];
    (0, utils_1.checkLocalStorageThemeValue)('changeTheme');
    (0, localization_1.checkLocalStorageLangValue)('changeLanguage');
    (0, utils_1.addListener)('sign-up-login', 'input', baseValidation_1.loginValidate.bind(null, validateStatus, 0, 'login-message', 'sign-up-login'));
    (0, utils_1.addListener)('sign-up-login', 'input', utils_1.validateStatusCheck.bind(null, validateStatus, 'create-account'));
    (0, utils_1.addListener)('sign-up-password', 'input', baseValidation_1.passwordValidate.bind(null, validateStatus, 1, 'password-message', 'sign-up-password'));
    (0, utils_1.addListener)('sign-up-password', 'input', baseValidation_1.confirmPasswordValidate.bind(null, validateStatus, 2, 'confirm-password-message', 'sign-up-password', 'sign-up-confirm-password'));
    (0, utils_1.addListener)('sign-up-password', 'input', utils_1.validateStatusCheck.bind(null, validateStatus, 'create-account'));
    (0, utils_1.addListener)('sign-up-confirm-password', 'input', baseValidation_1.confirmPasswordValidate.bind(null, validateStatus, 2, 'confirm-password-message', 'sign-up-password', 'sign-up-confirm-password'));
    (0, utils_1.addListener)('sign-up-confirm-password', 'input', utils_1.validateStatusCheck.bind(null, validateStatus, 'create-account'));
    (0, utils_1.addListener)('password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'password-hide', 'sign-up-password'));
    (0, utils_1.addListener)('confirm-password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'confirm-password-hide', 'sign-up-confirm-password'));
    (0, utils_1.addListener)('create-account', 'click', logic_1.sendRegister.bind(null, state));
    (0, utils_1.addListener)('dropdownTheme', 'change', (event) => (0, utils_1.changeInterfaceState)(event));
    (0, utils_1.addListener)('dropdownLanguage', 'change', (event) => (0, localization_1.changeLng)(event));
}
exports.initRegister = initRegister;
document.addEventListener('DOMContentLoaded', initRegister.bind(null));
//# sourceMappingURL=index.js.map