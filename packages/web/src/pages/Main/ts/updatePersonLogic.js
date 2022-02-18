"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePerson = exports.updatePersonRequest = exports.updateObjInState = exports.generateNewRowContent = void 0;
const utils_1 = require("../../../utils/ts/utils");
const modal_1 = require("./modal");
const validation_1 = require("./validation");
const localization_1 = require("../../../utils/ts/localization");
function generateNewRowContent(id, obj) {
    return `
          <td>${id}</td>
          <td>${obj.fname}</td>
          <td>${obj.lname}</td>
          <td>${obj.age}</td>
          <td>${obj.city}</td>
          <td>${obj.phoneNumber}</td>
          <td>${obj.email}</td>
          <td>${obj.companyName}</td>`;
}
exports.generateNewRowContent = generateNewRowContent;
function updateObjInState(stateArr, id, newObj) {
    stateArr.map((el) => {
        if (el.id === Number(id)) {
            el.fname = newObj.fname;
            el.lname = newObj.lname;
            el.age = newObj.age;
            el.city = newObj.city;
            el.phoneNumber = newObj.phoneNumber;
            el.email = newObj.email;
            el.companyName = newObj.companyName;
            return el;
        }
        return el;
    });
    return stateArr;
}
exports.updateObjInState = updateObjInState;
function updatePersonRequest(state, data, personObj) {
    const updateUrl = `${state.currentDB}/update:${state.currentSelectedId}`;
    fetch(updateUrl, {
        method: 'POST',
        body: data,
    })
        .then((response) => {
        (0, utils_1.updatePersonResponse)(state, response, personObj);
        // if (response.redirected) {
        //   window.location.href = response.url;
        //   return false;
        // }
        //
        // if (response.status === 200) {
        //   setHTMLValue(state.currentSelectedNode, generateNewRowContent(state.currentSelectedId, personObj));
        //   updateObjInState(state.currentData, state.currentSelectedId, personObj);
        //
        //   if (state.currentSortedData !== null) {
        //     updateObjInState(state.currentSortedData, state.currentSelectedId, personObj);
        //   }
        // }
        // removeDisabledAttributeByID('updateButton');
        // closedModal('modalUpdate');
        return true;
    })
        .catch(() => {
        (0, utils_1.removeDisabledAttributeByID)('updateButton');
        (0, modal_1.closedModal)('modalUpdate');
        return false;
    });
}
exports.updatePersonRequest = updatePersonRequest;
function updatePerson(state) {
    const personData = (0, utils_1.collectData)('update-form');
    const obj = Object.fromEntries(personData);
    const validateResult = (0, validation_1.validatePersonForm)(obj);
    const formError = (0, utils_1.getElement)('update-form-error');
    if ((0, utils_1.valueLength)(validateResult) > 0) {
        (0, utils_1.setHTMLValue)(formError, '<span data-i18n="error.modal.message"></span>');
        // console.log(validateResult);
        validateResult.forEach((span, idx) => {
            (0, utils_1.addHTMLValue)(formError, span);
            if (idx !== (0, utils_1.valueLength)(validateResult) - 1) {
                (0, utils_1.addHTMLValue)(formError, ', ');
            }
            else {
                (0, utils_1.addHTMLValue)(formError, '.');
            }
        });
        (0, localization_1.updateContent)();
        return false;
    }
    (0, utils_1.setDisabledAttributeByID)('updateButton');
    updatePersonRequest(state, personData, obj);
    return true;
}
exports.updatePerson = updatePerson;
//# sourceMappingURL=updatePersonLogic.js.map