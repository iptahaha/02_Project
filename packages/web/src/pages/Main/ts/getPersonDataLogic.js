"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const utils_1 = require("../../../utils/ts/utils");
function getData(state) {
    state.currentSortedData = null;
    const dataUrl = `${state.currentDB}/data`;
    (0, utils_1.addClass)('loader', 'page__loader--active');
    fetch(dataUrl)
        .then((response) => response.json())
        .then((data) => {
        state.currentData = [];
        data.forEach((el) => {
            state.currentData.push(el);
        });
        const sortValue = (0, utils_1.getInputValue)('sort-by-select');
        (0, utils_1.appendChild)('tableBody', (0, utils_1.createRowCollection)(state.currentData, sortValue));
        (0, utils_1.removeClassById)('loader', 'page__loader--active');
        return true;
    })
        .catch(() => false);
    return true;
}
exports.getData = getData;
//# sourceMappingURL=getPersonDataLogic.js.map