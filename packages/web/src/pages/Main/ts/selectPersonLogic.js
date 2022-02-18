"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClick = exports.selectRow = void 0;
const utils_1 = require("../../../utils/ts/utils");
function selectRow(event, state) {
    const target = (0, utils_1.targetValueClosest)(event, 'tr'); //event.target.closest('tr');
    const previousRow = state.currentSelectedNode;
    if (target) {
        (0, utils_1.addElementClass)(target, 'table__row--active'); // target.classList.add('table__row--active');
    }
    if (previousRow) {
        (0, utils_1.removeClass)(previousRow, 'table__row--active'); // previousRow.classList.remove('table__row--active');
    }
    if (target === previousRow) {
        state.currentSelectedNode = null;
        state.currentSelectedId = null;
        state.currentSelectedObj = null;
        (0, utils_1.setDisabledAttributeByID)('buttonDelete');
        (0, utils_1.setDisabledAttributeByID)('buttonUpdate');
        return (0, utils_1.addId)(target); //target.id;
    }
    state.currentData.forEach((el) => {
        if (el.id === Number((0, utils_1.addId)(target))) { //Number(target.id)) {
            state.currentSelectedObj = el;
        }
    });
    state.currentSelectedId = (0, utils_1.addId)(target); //target.id;
    state.currentSelectedNode = target;
    (0, utils_1.removeDisabledAttributeByID)('buttonDelete');
    (0, utils_1.removeDisabledAttributeByID)('buttonUpdate');
    return (0, utils_1.addId)(target); //target.id;
}
exports.selectRow = selectRow;
function getClick(state) {
    selectRow(event, state);
    return state;
}
exports.getClick = getClick;
//# sourceMappingURL=selectPersonLogic.js.map