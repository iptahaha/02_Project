"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRow = exports.filterObjInState = void 0;
const utils_1 = require("../../../utils/ts/utils");
const modal_1 = require("./modal");
function filterObjInState(stateArr, id) {
    return stateArr.filter((el) => {
        if (el.id !== Number(id)) {
            return el;
        }
    });
}
exports.filterObjInState = filterObjInState;
function deleteRow(state) {
    (0, utils_1.setDisabledAttributeByID)('saveDelete');
    const deleteUrl = `${state.currentDB}/delete:${state.currentSelectedId}`;
    fetch(deleteUrl, {
        method: 'DELETE',
    })
        .then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
            return false;
        }
        if (response.status === 200) {
            state.currentData = filterObjInState(state.currentData, state.currentSelectedNode.id);
            if (state.currentSortedData !== null) {
                state.currentSortedData = filterObjInState(state.currentSortedData, state.currentSelectedId);
            }
            state.currentSelectedNode.parentNode.removeChild(state.currentSelectedNode);
            state.currentSelectedNode = null;
            state.currentSelectedId = null;
            state.currentSelectedObj = null;
            (0, utils_1.setDisabledAttributeByID)('buttonDelete');
            (0, utils_1.setDisabledAttributeByID)('buttonUpdate');
            (0, utils_1.removeDisabledAttributeByID)('saveDelete');
            (0, modal_1.closedModal)('deleteModal');
            return true;
        }
    })
        .catch(() => {
        (0, utils_1.removeDisabledAttributeByID)('saveDelete');
        (0, modal_1.closedModal)('deleteModal');
        return false;
    });
    return false;
}
exports.deleteRow = deleteRow;
//# sourceMappingURL=deletePersonLogic.js.map