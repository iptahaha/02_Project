"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPerson = exports.addNewPersonRequest = void 0;
const utils_1 = require("../../../utils/ts/utils");
const validation_1 = require("./validation");
const modal_1 = require("./modal");
const localization_1 = require("../../../utils/ts/localization");
const getPersonDataLogic_1 = require("./getPersonDataLogic");
function addNewPersonRequest(state, personData) {
    const addUrl = `${state.currentDB}/create`;
    fetch(addUrl, {
        method: 'POST',
        body: personData,
    })
        .then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
            return false;
        }
        (0, utils_1.removeChild)('tableBody');
        (0, getPersonDataLogic_1.getData)(state);
        (0, utils_1.removeDisabledAttributeByID)('createButton');
        (0, modal_1.closedModal)('modalCreate');
        return true;
    })
        .catch(() => {
        (0, utils_1.removeDisabledAttributeByID)('createButton');
        (0, modal_1.closedModal)('modalCreate');
        return false;
    });
}
exports.addNewPersonRequest = addNewPersonRequest;
function addNewPerson(state) {
    const personData = (0, utils_1.collectData)('create-form');
    const obj = Object.fromEntries(personData);
    const validateResult = (0, validation_1.validatePersonForm)(obj);
    const formError = (0, utils_1.getElement)('create-form-error');
    (0, utils_1.setHTMLValue)(formError, '');
    if ((0, utils_1.valueLength)(validateResult) > 0) {
        (0, utils_1.addHTMLValue)(formError, '<span data-i18n="error.modal.message"></span>');
        validateResult.forEach((span, idx) => {
            (0, utils_1.addHTMLValue)(formError, span);
            if (idx !== validateResult.length - 1) {
                (0, utils_1.addHTMLValue)(formError, ', ');
            }
            else {
                (0, utils_1.addHTMLValue)(formError, '.');
            }
        });
        (0, localization_1.updateContent)();
        return false;
    }
    (0, utils_1.setDisabledAttributeByID)('createButton');
    addNewPersonRequest(state, personData);
    return true;
}
exports.addNewPerson = addNewPerson;
//# sourceMappingURL=createPersonLogic.js.map