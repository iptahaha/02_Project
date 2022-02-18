"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByName = void 0;
const utils_1 = require("../../../utils/ts/utils");
function filterByName(state) {
    const dataCopy = (0, utils_1.slice)(state.currentData);
    const searchValue = (0, utils_1.getInputValue)('search');
    const sortValue = (0, utils_1.getInputValue)('sort-by-select');
    const sortByName = (0, utils_1.trimToLowerCase)(searchValue);
    if ((0, utils_1.valueLength)(sortByName) === 0) {
        state.currentSortedData = null;
        (0, utils_1.removeChild)('tableBody');
        (0, utils_1.appendChild)('tableBody', (0, utils_1.createRowCollection)(state.currentData, sortValue));
        return state;
    }
    state.currentSortedData = dataCopy.filter((el) => {
        const fullNameFirstNameFirst = `${el.fname} ${el.lname}`;
        const fullNameLastNameFirst = `${el.lname} ${el.fname}`;
        if ((0, utils_1.includes)(fullNameFirstNameFirst, sortByName)) {
            return el;
        }
        if ((0, utils_1.includes)(fullNameLastNameFirst, sortByName)) {
            return el;
        }
    });
    (0, utils_1.removeChild)('tableBody');
    (0, utils_1.appendChild)('tableBody', (0, utils_1.createRowCollection)(state.currentSortedData, sortValue));
    return state;
}
exports.filterByName = filterByName;
//# sourceMappingURL=searchByNameLogic.js.map