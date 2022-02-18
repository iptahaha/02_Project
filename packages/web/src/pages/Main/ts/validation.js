"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePersonForm = void 0;
const utils_1 = require("../../../utils/ts/utils");
function validatePersonForm(obj) {
    const errorField = [];
    const phoneReg = /([+]?\d{1,2}[.-s]?)?(\d{3}[.-]?){2}\d{4}/g;
    const emailReg = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;
    if ((0, utils_1.valueLength)(obj.fname) < 2 || (0, utils_1.valueLength)(obj.fname) > 30 || !(0, utils_1.valueLength)(obj.fname)) { // if (obj.fname.length < 2 || obj.fname.length > 30 || !obj.fname) {
        errorField.push('<span data-i18n="error.modal.first_name"></span>');
    }
    if ((0, utils_1.valueLength)(obj.lname) < 2 || (0, utils_1.valueLength)(obj.lname) > 30) { //if (obj.lname.length < 2 || obj.lname.length > 30) {
        errorField.push('<span data-i18n="error.modal.last_name"></span>');
    }
    if (obj.age < 18 || obj.age > 120 || !obj.age) {
        errorField.push('<span data-i18n="error.modal.age"></span>');
    }
    if ((0, utils_1.valueLength)(obj.city) < 2 || (0, utils_1.valueLength)(obj.city) > 30) { //if (obj.city.length < 2 || obj.city.length > 30) {
        errorField.push('<span data-i18n="error.modal.city"></span>');
    }
    if (!(0, utils_1.addMatch)(obj.phoneNumber, phoneReg)) { //if (!obj.phoneNumber.match(phoneReg)) {
        errorField.push('<span data-i18n="error.modal.phone_number"></span>');
    }
    if (!(0, utils_1.addMatch)(obj.email, emailReg)) { //if (!obj.email.match(emailReg)) {
        errorField.push('<span data-i18n="error.modal.email"></span>');
    }
    if ((0, utils_1.valueLength)(obj.companyName) < 3 || (0, utils_1.valueLength)(obj.companyName) > 30) { //if (obj.companyName.length < 3 || obj.companyName.length > 30) {
        errorField.push('<span data-i18n="error.modal.company"></span>');
    }
    return errorField;
}
exports.validatePersonForm = validatePersonForm;
//# sourceMappingURL=validation.js.map