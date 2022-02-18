"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const utils_1 = require("../../../utils/ts/utils");
require("../../../utils/styles/mainPage.scss");
const localization_1 = require("../../../utils/ts/localization");
const modal_1 = require("./modal");
const updatePersonLogic_1 = require("./updatePersonLogic");
const selectPersonLogic_1 = require("./selectPersonLogic");
const createPersonLogic_1 = require("./createPersonLogic");
const clearAllLogic_1 = require("./clearAllLogic");
const getPersonDataLogic_1 = require("./getPersonDataLogic");
const deletePersonLogic_1 = require("./deletePersonLogic");
const searchByNameLogic_1 = require("./searchByNameLogic");
const selectsLogic_1 = require("./selectsLogic");
const changeUserLogic_1 = require("./changeUserLogic");
const baseValidation_1 = require("../../../utils/validation/baseValidation");
const logoutLogic_1 = require("./logoutLogic");
function init() {
    const mainState = {
        currentDB: '/mysql',
        currentData: null,
        currentSortedData: null,
        currentSelectedNode: null,
        currentSelectedId: null,
        currentSelectedObj: null,
    };
    const validateLoginChange = [false, false];
    const validatePasswordChange = [false, false, false];
    (0, utils_1.checkLocalStorageThemeValue)('changeTheme');
    (0, localization_1.checkLocalStorageLangValue)('changeLanguage');
    (0, getPersonDataLogic_1.getData)(mainState);
    (0, utils_1.addListener)('dropdownTheme', 'change', (event) => (0, utils_1.changeInterfaceState)(event));
    (0, utils_1.addListener)('dropdownLanguage', 'change', (event) => (0, localization_1.changeLng)(event));
    // search
    (0, utils_1.addListener)('search', 'input', searchByNameLogic_1.filterByName.bind(null, mainState));
    // select row
    (0, utils_1.addListener)('tableBody', 'click', selectPersonLogic_1.getClick.bind(null, mainState));
    // selects
    (0, utils_1.addListener)('sort-by-select', 'change', selectsLogic_1.sortData.bind(null, mainState));
    (0, utils_1.addListener)('data-base-select', 'change', selectsLogic_1.changeCurrentDB.bind(null, mainState));
    // update
    (0, utils_1.addListener)('buttonUpdate', 'click', modal_1.fillUpdateModal.bind(null, mainState));
    (0, utils_1.addListener)('closeUpdateModal', 'click', modal_1.closedModal.bind(null, 'modalUpdate'));
    (0, utils_1.addListener)('updateButton', 'click', updatePersonLogic_1.updatePerson.bind(null, mainState));
    // create
    (0, utils_1.addListener)('buttonCreate', 'click', modal_1.openModal.bind(null, 'modalCreate'));
    (0, utils_1.addListener)('closeCreateModal', 'click', modal_1.closedModal.bind(null, 'modalCreate'));
    (0, utils_1.addListener)('createButton', 'click', createPersonLogic_1.addNewPerson.bind(null, mainState));
    // clear
    (0, utils_1.addListener)('buttonClear', 'click', modal_1.openModal.bind(null, 'clearModal'));
    (0, utils_1.addListener)('closedClearModal', 'click', modal_1.closedModal.bind(null, 'clearModal'));
    (0, utils_1.addListener)('cancelClear', 'click', modal_1.closedModal.bind(null, 'clearModal'));
    (0, utils_1.addListener)('saveClear', 'click', clearAllLogic_1.clearAll.bind(null, mainState));
    // delete
    (0, utils_1.addListener)('buttonDelete', 'click', modal_1.openModal.bind(null, 'deleteModal'));
    (0, utils_1.addListener)('closedDeleteModal', 'click', modal_1.closedModal.bind(null, 'deleteModal'));
    (0, utils_1.addListener)('cancelDelete', 'click', modal_1.closedModal.bind(null, 'deleteModal'));
    (0, utils_1.addListener)('saveDelete', 'click', deletePersonLogic_1.deleteRow.bind(null, mainState));
    // changeUser
    (0, utils_1.addListener)('changeUser', 'click', modal_1.openModal.bind(null, 'modalUser'));
    (0, utils_1.addListener)('closeUserModal', 'click', modal_1.closedModal.bind(null, 'modalUser'));
    // login
    (0, utils_1.addListener)('update-login', 'input', baseValidation_1.loginValidate.bind(null, validateLoginChange, 0, 'change-login-message', 'update-login'));
    (0, utils_1.addListener)('update-login', 'input', utils_1.validateStatusCheck.bind(null, validateLoginChange, 'changeLoginButton'));
    (0, utils_1.addListener)('update-login-password', 'input', baseValidation_1.passwordValidate.bind(null, validateLoginChange, 1, 'change-login-password-message', 'update-login-password'));
    (0, utils_1.addListener)('update-login-password', 'input', utils_1.validateStatusCheck.bind(null, validateLoginChange, 'changeLoginButton'));
    (0, utils_1.addListener)('update-login-password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'update-login-password-hide', 'update-login-password'));
    (0, utils_1.addListener)('changeLoginButton', 'click', changeUserLogic_1.changeUserLogin.bind(null, validateLoginChange));
    // password
    (0, utils_1.addListener)('update-password', 'input', utils_1.validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'));
    (0, utils_1.addListener)('update-password', 'input', baseValidation_1.passwordValidate.bind(null, validatePasswordChange, 0, 'change-password-message', 'update-password'));
    (0, utils_1.addListener)('update-new-password', 'input', baseValidation_1.passwordValidate.bind(null, validatePasswordChange, 1, 'change-new-password-message', 'update-new-password'));
    (0, utils_1.addListener)('update-new-password', 'input', baseValidation_1.confirmPasswordValidate.bind(null, validatePasswordChange, 2, 'change-confirm-password-message', 'update-new-password', 'update-confirm-new-password'));
    (0, utils_1.addListener)('update-new-password', 'input', utils_1.validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'));
    (0, utils_1.addListener)('update-confirm-new-password', 'input', baseValidation_1.passwordValidate.bind(null, validatePasswordChange, 1, 'change-confirm-password-message', 'update-confirm-new-password'));
    (0, utils_1.addListener)('update-confirm-new-password', 'input', baseValidation_1.confirmPasswordValidate.bind(null, validatePasswordChange, 2, 'change-confirm-password-message', 'update-new-password', 'update-confirm-new-password'));
    (0, utils_1.addListener)('update-confirm-new-password', 'input', utils_1.validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'));
    (0, utils_1.addListener)('update-password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'update-password-hide', 'update-password'));
    (0, utils_1.addListener)('update-new-password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'update-new-password-hide', 'update-new-password'));
    (0, utils_1.addListener)('update-confirm-password-hide', 'click', utils_1.showOrHidePassword.bind(null, 'update-confirm-password-hide', 'update-confirm-new-password'));
    (0, utils_1.addListener)('changePasswordButton', 'click', changeUserLogic_1.changeUserPassword.bind(null, validatePasswordChange));
    // exitModal
    (0, utils_1.addListener)('exitUser', 'click', modal_1.openModal.bind(null, 'exitModal'));
    (0, utils_1.addListener)('closedExitModal', 'click', modal_1.closedModal.bind(null, 'exitModal'));
    (0, utils_1.addListener)('cancelExit', 'click', modal_1.closedModal.bind(null, 'exitModal'));
    (0, utils_1.addListener)('saveExit', 'click', logoutLogic_1.logout);
}
exports.init = init;
document.addEventListener('DOMContentLoaded', init.bind(null));
//# sourceMappingURL=index.js.map