import {
  addListener,
  checkLocalStorageValue,
  changeInterfaceState,
  appendChild,
  collectData, setDisplay,
} from '../../utils/ts/utils';

import '../../utils/styles/mainPage.scss';

import { changeLng } from '../../utils/ts/localization';
import { Person } from '../../utils/interfaces/person.interface';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // const state: {
  //   mongoUrl: string;
  //   mySQLUrl: string;
  //   data: string;
  //   create: string;
  //   delete: string;
  //   update: string;
  // } = {
  //   mongoUrl: '',
  //   mySQLUrl: '/mysql',
  //   data: '/data',
  //   create: '/create',
  //   delete: '/delete',
  //   update: '/update',
  // };

  const dataBaseState: { currentDB: string } = {
    currentDB: '/mysql',
  };

  checkLocalStorageValue('changeTheme');
  // checkLocalStorageValue('changeLanguage');
  getData(`${dataBaseState.currentDB}`);

  addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
  addListener('dropdownLanguage', 'change', (event) => changeLng(event));
 // addListener('createButton', 'click', addNewPerson.bind(null, dataBaseState));

//update
  addListener('buttonUpdate', 'click', openModal.bind(null, 'modalUpdate'));
  addListener('closeUpdateModal', 'click', closedModal.bind(null, 'modalUpdate'));
  addListener('updateButton', 'click', closedModal.bind(null, 'modalUpdate'));
// create
  addListener('buttonCreate', 'click', openModal.bind(null, 'modalCreate'));
  addListener('closeCreateModal', 'click', closedModal.bind(null, 'modalCreate'));
  addListener('createButton', 'click',() => {
    addNewPerson.bind(null, dataBaseState)();
    closedModal.bind(null, 'modalCreate')();
  });
//clear
  addListener('buttonClear', 'click', openModal.bind(null, 'clearModal'));
  addListener('closedClearModal', 'click', closedModal.bind(null, 'clearModal'));
  addListener('canselClear', 'click', closedModal.bind(null, 'clearModal'));
  addListener('saveClear', 'click', () => {
    closedModal.bind(null, 'clearModal')();
  });

  //delete
  addListener('buttonDelete', 'click', openModal.bind(null, 'deleteModal'));
  addListener('closedDeleteModal', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('canselDelete', 'click', closedModal.bind(null, 'deleteModal'));
  addListener('saveDelete', 'click', () => {
    closedModal.bind(null, 'deleteModal')();
  });
}

function getData(url) {
  const dataUrl = `${url}/data`;
  fetch(dataUrl)
    .then((response: Response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((el: Person) => {
        createTableRow(el);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addNewPerson(state) {
  const personData = collectData('create-form');
  console.log(personData);
  const addUrl = `${state.currentDB}/create`;
  fetch(addUrl, {
    method: 'POST',
    body: personData,
  });
}

function createTableRow(obj: Person) {
  const row = document.createElement('tr');
  row.id = obj.id.toString();
  row.innerHTML = `
    <td>${obj.id}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
    <td>${obj.age}</td>
    <td>${obj.city}</td>
    <td>${obj.phoneNumber}</td>
    <td>${obj.email}</td>
    <td>${obj.companyName}</td>`;

  appendChild('tableBody', row);
}

function openModal(id:string):void {
  setDisplay(id, 'block');
}

function closedModal(id:string):void {
  setDisplay(id, 'none');
  cleanForm();
}

function cleanForm() {
  const input = document.querySelectorAll('input');
  input.forEach(el => el.value = '');
}
