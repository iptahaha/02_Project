import { addListener, checkLocalStorageValue, changeInterfaceState } from '../../utils/ts/utils';

import '../../utils/styles/mainPage.scss';
import { changeLng } from '../../utils/ts/localization';
import {
  changeCurrentDB,
  filterByName,
  sortData,
} from './logic';
import { closedModal, fillUpdateModal, openModal } from './modal';
import { updatePerson } from './updatePesonLogic';
import { getClick } from './selectPersonLogic';
import { addNewPerson } from './createPersonLogic';
import { clearAll } from './clearAllLogic';
import { getData } from './getPesonDataLogic';
import { deleteRow } from './deletePersonLogic';

function init() {
  const mainState = {
    currentDB: '/mysql',
    currentData: null,
    currentSortedData: null,
    currentSelectedNode: null,
    currentSelectedId: null,
    currentSelectedObj: null,
  };

  checkLocalStorageValue('changeTheme');
  // checkLocalStorageValue('changeLanguage');
  getData(mainState);

  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));

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
  addListener('canselClear', 'click', closedModal.bind(null, 'clearModal'));
  addListener('saveClear', 'click', clearAll.bind(null, mainState));

  // delete

  addListener('buttonDelete', 'click', openModal.bind(null, 'deleteModal'));
  addListener('closedDeleteModal', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('canselDelete', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('saveDelete', 'click', deleteRow.bind(null, mainState));
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
