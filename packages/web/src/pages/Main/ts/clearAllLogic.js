"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAll = void 0;
const utils_1 = require("../../../utils/ts/utils");
const modal_1 = require("./modal");
function clearAll(state) {
    (0, utils_1.setDisabledAttributeByID)('saveClear');
    const clearUrl = `${state.currentDB}/clear`;
    fetch(clearUrl, {
        method: 'DELETE',
    })
        .then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
            return false;
        }
        state.currentData = null;
        state.currentSortedData = null;
        (0, utils_1.removeChild)('tableBody');
        (0, utils_1.removeDisabledAttributeByID)('saveClear');
        (0, modal_1.closedModal)('clearModal');
        return true;
    })
        .catch(() => {
        (0, utils_1.removeDisabledAttributeByID)('saveClear');
        (0, modal_1.closedModal)('clearModal');
        return false;
    });
    return false;
}
exports.clearAll = clearAll;
//# sourceMappingURL=clearAllLogic.js.map