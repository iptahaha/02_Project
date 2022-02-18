"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = exports.changeUserLogin = void 0;
const utils_1 = require("../../../utils/ts/utils");
const baseValidation_1 = require("../../../utils/validation/baseValidation");
function changeUserLogin(state) {
    if ((0, baseValidation_1.loginValidate)(state, 0, 'change-login-message', 'update-login') === false ||
        (0, baseValidation_1.passwordValidate)(state, 1, 'change-login-password-message', 'update-login-password') === false) {
        return false;
    }
    const data = (0, utils_1.collectData)('changeLoginForm');
    (0, utils_1.changeUserLoginRequest)(data);
    return true;
}
exports.changeUserLogin = changeUserLogin;
function changeUserPassword(state) {
    if ((0, baseValidation_1.passwordValidate)(state, 0, 'change-password-message', 'update-password') === false ||
        (0, baseValidation_1.passwordValidate)(state, 1, 'change-new-password-message', 'update-new-password') === false ||
        (0, baseValidation_1.confirmPasswordValidate)(state, 2, 'change-confirm-password-message', 'update-new-password', 'update-confirm-new-password') === false) {
        return false;
    }
    const data = (0, utils_1.collectData)('changePasswordForm');
    (0, utils_1.changeUserPasswordRequest)(data);
    return true;
}
exports.changeUserPassword = changeUserPassword;
//# sourceMappingURL=changeUserLogic.js.map