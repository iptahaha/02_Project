import {
  addListener,
  checkLocalStorageThemeValue,
  changeInterfaceState,
  validateStatusCheck,
  showOrHidePassword,
  checkLocalStorageDbValue, showDance,
} from '../../../utils/ts/utils';

import '../../../utils/styles/mainPage.scss';
import { changeLng, checkLocalStorageLangValue } from '../../../utils/ts/localization';
import { closedModal, fillUpdateModal, openModal } from './modal';
import { updatePerson } from './updatePersonLogic';
import { getClick } from './selectPersonLogic';
import { addNewPerson } from './createPersonLogic';
import { clearAll } from './clearAllLogic';
import { getData } from './getPersonDataLogic';
import { deleteRow } from './deletePersonLogic';
import { filterByName } from './searchByNameLogic';
import { changeCurrentDB, sortData } from './selectsLogic';
import { changeUserLogin, changeUserPassword } from './changeUserLogic';
import { confirmPasswordValidate, loginValidate, passwordValidate } from '../../../utils/validation/baseValidation';
import { logout } from './logoutLogic';

export function init() {
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

  checkLocalStorageThemeValue('changeTheme');
  checkLocalStorageLangValue('changeLanguage');
  checkLocalStorageDbValue('changeDb', mainState);

  addListener('dropdownTheme', 'change', changeInterfaceState);
  addListener('dropdownLanguage', 'change', changeLng);

  getData(mainState);

  // search
  addListener('search', 'input', filterByName.bind(null, mainState));

  // select row
  addListener('tableBody', 'click', getClick.bind(null, mainState));

  // selects
  addListener('sort-by-select', 'change', sortData.bind(null, mainState));
  addListener('data-base-select', 'change', changeCurrentDB.bind(null, mainState));

  // update
  addListener('buttonUpdate', 'click', fillUpdateModal.bind(null, mainState));
  addListener('closeUpdateModal', 'click', closedModal.bind(null, 'modalUpdate'));
  addListener('updateButton', 'click', updatePerson.bind(null, mainState));

  // create
  addListener('buttonCreate', 'click', openModal.bind(null, 'modalCreate'));
  addListener('closeCreateModal', 'click', closedModal.bind(null, 'modalCreate'));
  addListener('createButton', 'click', addNewPerson.bind(null, mainState));

  // clear
  addListener('buttonClear', 'click', openModal.bind(null, 'clearModal'));
  addListener('closedClearModal', 'click', closedModal.bind(null, 'clearModal'));
  addListener('cancelClear', 'click', closedModal.bind(null, 'clearModal'));
  addListener('saveClear', 'click', clearAll.bind(null, mainState));

  // delete
  addListener('buttonDelete', 'click', openModal.bind(null, 'deleteModal'));
  addListener('closedDeleteModal', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('cancelDelete', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('saveDelete', 'click', deleteRow.bind(null, mainState));

  // changeUser
  addListener('changeUser', 'click', openModal.bind(null, 'modalUser'));
  addListener('closeUserModal', 'click', closedModal.bind(null, 'modalUser'));

  // login
  addListener(
    'update-login',
    'input',
    loginValidate.bind(null, validateLoginChange, 0, 'change-login-message', 'update-login'),
  );
  addListener('update-login', 'input', validateStatusCheck.bind(null, validateLoginChange, 'changeLoginButton'));
  addListener(
    'update-login-password',
    'input',
    passwordValidate.bind(null, validateLoginChange, 1, 'change-login-password-message', 'update-login-password'),
  );
  addListener(
    'update-login-password',
    'input',
    validateStatusCheck.bind(null, validateLoginChange, 'changeLoginButton'),
  );
  addListener(
    'update-login-password-hide',
    'click',
    showOrHidePassword.bind(null, 'update-login-password-hide', 'update-login-password'),
  );
  addListener('changeLoginButton', 'click', changeUserLogin.bind(null, validateLoginChange));

  // password
  addListener(
    'update-password',
    'input',
    validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'),
  );
  addListener(
    'update-password',
    'input',
    passwordValidate.bind(null, validatePasswordChange, 0, 'change-password-message', 'update-password'),
  );

  addListener(
    'update-new-password',
    'input',
    passwordValidate.bind(null, validatePasswordChange, 1, 'change-new-password-message', 'update-new-password'),
  );
  addListener(
    'update-new-password',
    'input',
    confirmPasswordValidate.bind(
      null,
      validatePasswordChange,
      2,
      'change-confirm-password-message',
      'update-new-password',
      'update-confirm-new-password',
    ),
  );
  addListener(
    'update-new-password',
    'input',
    validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'),
  );

  addListener(
    'update-confirm-new-password',
    'input',
    passwordValidate.bind(
      null,
      validatePasswordChange,
      1,
      'change-confirm-password-message',
      'update-confirm-new-password',
    ),
  );
  addListener(
    'update-confirm-new-password',
    'input',
    confirmPasswordValidate.bind(
      null,
      validatePasswordChange,
      2,
      'change-confirm-password-message',
      'update-new-password',
      'update-confirm-new-password',
    ),
  );
  addListener(
    'update-confirm-new-password',
    'input',
    validateStatusCheck.bind(null, validatePasswordChange, 'changePasswordButton'),
  );

  addListener(
    'update-password-hide',
    'click',
    showOrHidePassword.bind(null, 'update-password-hide', 'update-password'),
  );
  addListener(
    'update-new-password-hide',
    'click',
    showOrHidePassword.bind(null, 'update-new-password-hide', 'update-new-password'),
  );
  addListener(
    'update-confirm-password-hide',
    'click',
    showOrHidePassword.bind(null, 'update-confirm-password-hide', 'update-confirm-new-password'),
  );

  addListener('changePasswordButton', 'click', changeUserPassword.bind(null, validatePasswordChange));

  // exitModal
  addListener('easter-egg-button', 'click', showDance);
  addListener('exitUser', 'click', openModal.bind(null, 'exitModal'));
  addListener('closedExitModal', 'click', closedModal.bind(null, 'exitModal'));
  addListener('cancelExit', 'click', closedModal.bind(null, 'exitModal'));
  addListener('saveExit', 'click', logout);
}

document.addEventListener('DOMContentLoaded', init.bind(null));
