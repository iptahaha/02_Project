import {
  addListener,
  checkLocalStorageValue,
  changeInterfaceState,
  getElement,
} from '../../utils/ts/utils';

import '../../utils/styles/mainPage.scss';
import { Person } from '../../utils/interfaces/person.interface';
import { changeLng } from '../../utils/ts/localization';
import {
  addNewPerson,
  clearAll,
  deleteRow,
  filterByName,
  getClick,
  getData,
  sortData,
} from './logic';
import { closedModal, openModal } from './modal';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {

  const dataBaseState: { currentDB: string } = {
    currentDB: '/mysql',
  };

  const dataState: { currentData: Person[] } = {
    currentData: [],
  };

  const controlState: { currentSelect: null | string } = {
    currentSelect: '',
  };

  const sortedData: { currentData: Person[] | null } = {
    currentData: null,
  };

  checkLocalStorageValue('changeTheme');
  // checkLocalStorageValue('changeLanguage');
  getData(`${dataBaseState.currentDB}`, dataState);

  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));

  // search
  addListener('search', 'input', filterByName.bind(null, dataState, sortedData));

  // select row
  addListener('tableBody', 'click', getClick.bind(null, controlState));

  // selects
  addListener('sort-by-select', 'change', sortData.bind(null, dataState, sortedData));

  // update
  addListener('buttonUpdate', 'click', openModal.bind(null, 'modalUpdate'));
  addListener('closeUpdateModal', 'click', closedModal.bind(null, 'modalUpdate'));
  addListener('updateButton', 'click', closedModal.bind(null, 'modalUpdate'));
  // create
  addListener('buttonCreate', 'click', openModal.bind(null, 'modalCreate'));
  addListener('closeCreateModal', 'click', closedModal.bind(null, 'modalCreate'));
  addListener('createButton', 'click', addNewPerson.bind(null, dataBaseState, dataState));
  // clear
  addListener('buttonClear', 'click', openModal.bind(null, 'clearModal'));
  addListener('closedClearModal', 'click', closedModal.bind(null, 'clearModal'));
  addListener('canselClear', 'click', closedModal.bind(null, 'clearModal'));
  addListener('saveClear', 'click', clearAll.bind(null, dataBaseState, dataState));

  // delete
  addListener('buttonDelete', 'click', openModal.bind(null, 'deleteModal', controlState));
  addListener('closedDeleteModal', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('canselDelete', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('saveDelete', 'click', deleteRow.bind(null, dataBaseState, dataState, controlState));
}
