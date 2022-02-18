"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIn = void 0;
const utils_1 = require("../../utils/ts/utils");
const baseValidation_1 = require("../../utils/validation/baseValidation");
function loginIn(state) {
    if ((0, baseValidation_1.loginValidate)(state, 0, 'login-message', 'login-in-login') === false ||
        (0, baseValidation_1.passwordValidate)(state, 1, 'password-message', 'login-in-password') === false) {
        return false;
    }
    const data = (0, utils_1.collectData)('login-form');
    const globalErrorId = 'global-message';
    (0, utils_1.getFetchLogic)(state, data, globalErrorId);
    return true;
}
exports.loginIn = loginIn;
//# sourceMappingURL=logic.js.map