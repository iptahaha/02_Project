import { addListener, checkLocalStorageValue, changeInterfaceState } from '../../utils/ts/utils';

import '../../utils/styles/mainPage.scss';
import { Person } from '../../utils/interfaces/person.interface';
import { changeLng } from '../../utils/ts/localization';
import {
  addNewPerson, changeCurrentDB,
  clearAll,
  deleteRow,
  filterByName,
  getClick,
  getData,
  sortData,
  updatePerson,
} from './logic';
import { closedModal, fillUpdateModal, openModal } from './modal';

function init() {
  const dataBaseState: { currentDB: string } = {
    currentDB: '/mysql',
  };

  const dataState: { currentData: Person[] } = {
    currentData: [],
  };

  const controlState: {
    currentSelectedId: null | string;
    currentSelectedNode: HTMLLIElement | null;
    currentSelectedObj: Person | null;
  } = {
    currentSelectedNode: null,
    currentSelectedId: null,
    currentSelectedObj: null,
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
  addListener('tableBody', 'click', getClick.bind(null, controlState, dataState));

  // selects
  addListener('sort-by-select', 'change', sortData.bind(null, dataState, sortedData));
  addListener(
    'data-base-select',
    'change',
    changeCurrentDB.bind(null, dataBaseState, dataState, sortedData, controlState),
  );

  // update
  addListener('buttonUpdate', 'click', fillUpdateModal.bind(null, controlState));
  addListener('closeUpdateModal', 'click', closedModal.bind(null, 'modalUpdate'));
  addListener(
    'updateButton',
    'click',
    updatePerson.bind(null, dataBaseState, dataState, controlState),
  );
  // create
  addListener('buttonCreate', 'click', openModal.bind(null, 'modalCreate'));
  addListener('closeCreateModal', 'click', closedModal.bind(null, 'modalCreate'));
  addListener('createButton', 'click', addNewPerson.bind(null, dataBaseState, dataState));
  // clear
  addListener('buttonClear', 'click', openModal.bind(null, 'clearModal'));
  addListener('closedClearModal', 'click', closedModal.bind(null, 'clearModal'));
  addListener('canselClear', 'click', closedModal.bind(null, 'clearModal'));
  addListener('saveClear', 'click', clearAll.bind(null, dataBaseState, dataState, sortedData));

  // delete
  addListener('buttonDelete', 'click', openModal.bind(null, 'deleteModal', controlState));
  addListener('closedDeleteModal', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('canselDelete', 'click', closedModal.bind(null, 'deleteModal'));
  addListener(
    'saveDelete',
    'click',
    deleteRow.bind(null, dataBaseState, dataState, sortedData, controlState),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
