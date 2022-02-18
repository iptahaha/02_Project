"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCurrentDB = exports.sortData = void 0;
const utils_1 = require("../../../utils/ts/utils");
const getPersonDataLogic_1 = require("./getPersonDataLogic");
function sortData(state) {
    const sortValue = (0, utils_1.getInputValue)('sort-by-select');
    state.currentSelectedNode = null;
    state.currentSelectedId = null;
    state.currentSelectedObj = null;
    (0, utils_1.setDisabledAttributeByID)('buttonDelete');
    (0, utils_1.setDisabledAttributeByID)('buttonUpdate');
    let dataCopy;
    if (state.currentSortedData !== null) {
        dataCopy = (0, utils_1.slice)(state.currentSortedData); //state.currentSortedData.slice();
    }
    else {
        dataCopy = (0, utils_1.slice)(state.currentData); //state.currentData.slice();
    }
    (0, utils_1.removeChild)('tableBody');
    (0, utils_1.appendChild)('tableBody', (0, utils_1.createRowCollection)(dataCopy, sortValue));
    return dataCopy;
}
exports.sortData = sortData;
function changeCurrentDB(state) {
    state.currentDB = (0, utils_1.getInputValue)('data-base-select');
    state.currentData = null;
    state.currentData = null;
    state.currentSelectedId = null;
    state.currentSelectedNode = null;
    state.currentSelectedObj = null;
    (0, utils_1.setDisabledAttributeByID)('buttonDelete');
    (0, utils_1.setDisabledAttributeByID)('buttonUpdate');
    (0, utils_1.removeChild)('tableBody');
    (0, utils_1.setInputValue)('search', '');
    (0, getPersonDataLogic_1.getData)(state);
    // TODO пусть возвращает все state yopta
}
exports.changeCurrentDB = changeCurrentDB;
//# sourceMappingURL=selectsLogic.js.map