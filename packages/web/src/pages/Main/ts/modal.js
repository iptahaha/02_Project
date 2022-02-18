"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closedModal = exports.cleanForm = exports.fillUpdateModal = exports.openModal = void 0;
const utils_1 = require("../../../utils/ts/utils");
function openModal(id) {
    (0, utils_1.setDisplay)(id, 'block');
    return true;
}
exports.openModal = openModal;
function fillUpdateModal(state) {
    const currentObj = state.currentSelectedObj;
    (0, utils_1.setInputValue)('update-fname', currentObj.fname);
    (0, utils_1.setInputValue)('update-lname', currentObj.lname);
    (0, utils_1.setInputValue)('update-age', currentObj.age);
    (0, utils_1.setInputValue)('update-phoneNumber', currentObj.phoneNumber);
    (0, utils_1.setInputValue)('update-city', currentObj.city);
    (0, utils_1.setInputValue)('update-email', currentObj.email);
    (0, utils_1.setInputValue)('update-company', currentObj.companyName);
    openModal('modalUpdate');
    return true;
}
exports.fillUpdateModal = fillUpdateModal;
function cleanForm() {
    const input = (0, utils_1.getQuerySelectorAll)('input'); //document.querySelectorAll('input');
    input.forEach((el) => {
        if (el.id !== 'search') {
            el.value = '';
        }
    });
}
exports.cleanForm = cleanForm;
function closedModal(id) {
    (0, utils_1.setTextValue)('create-form-error', '');
    (0, utils_1.setTextValue)('update-form-error', '');
    (0, utils_1.setDisplay)(id, 'none');
    cleanForm();
}
exports.closedModal = closedModal;
//# sourceMappingURL=modal.js.map