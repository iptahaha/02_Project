"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLogin = void 0;
require("../../utils/styles/authPage.scss");
const utils_1 = require("../../utils/ts/utils");
const localization_1 = require("../../utils/ts/localization");
const baseValidation_1 = require("../../utils/validation/baseValidation");
const logic_1 = require("./logic");
function initLogin() {
    const state = {
        url: '/auth/login',
        validateStatus: [false, false],
    };
    const validateStatus = [false, false];
    (0, utils_1.checkLocalStorageThemeValue)('changeTheme');
    (0, localization_1.checkLocalStorageLangValue)('changeLanguage');
    (0, utils_1.addListener)('login-in-login', 'input', baseValidation_1.loginValidate.bind(null, validateStatus, 0, 'login-message', 'login-in-login'));
    (0, utils_1.addListener)('dropdownTheme', 'change', (event) => (0, utils_1.changeInterfaceState)(event));
    (0, utils_1.addListener)('dropdownLanguage', 'change', (event) => (0, localization_1.changeLng)(event));
    (0, utils_1.addListener)('login-in-login', 'input', utils_1.validateStatusCheck.bind(null, validateStatus, 'login-in'));
    (0, utils_1.addListener)('login-in-password', 'input', baseValidation_1.passwordValidate.bind(null, validateStatus, 1, 'password-message', 'login-in-password'));
    (0, utils_1.addListener)('login-in-password', 'input', utils_1.validateStatusCheck.bind(null, validateStatus, 'login-in'));
    (0, utils_1.addListener)('password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'password-hide', 'login-in-password'));
    (0, utils_1.addListener)('login-in', 'click', logic_1.loginIn.bind(null, state));
}
exports.initLogin = initLogin;
document.addEventListener('DOMContentLoaded', initLogin.bind(null));
//# sourceMappingURL=index.js.map