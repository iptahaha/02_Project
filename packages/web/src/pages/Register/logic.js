"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegister = void 0;
const utils_1 = require("../../utils/ts/utils");
const baseValidation_1 = require("../../utils/validation/baseValidation");
function sendRegister(state) {
    if ((0, baseValidation_1.loginValidate)(state, 0, 'login-message', 'sign-up-login') === false ||
        (0, baseValidation_1.passwordValidate)(state, 1, 'password-message', 'sign-up-password') === false ||
        (0, baseValidation_1.confirmPasswordValidate)(state, 2, 'confirm-password-message', 'sign-up-password', 'sign-up-confirm-password') ===
            false) {
        return false;
    }
    const data = (0, utils_1.collectData)('register-form');
    (0, utils_1.addFetchUrlRegister)(state, data);
    return true;
}
exports.sendRegister = sendRegister;
//# sourceMappingURL=logic.js.map