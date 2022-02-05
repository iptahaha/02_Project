import {
  getSelector,
  addListener,
  getAppendChild,
  checkLocalStorageValue,
  changeInterfaceState,
  appendChild,
  collectData,
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
  addListener('createButton', 'click', addNewPerson.bind(null, dataBaseState));
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
  const fakeRow = document.createElement('tr');
  fakeRow.classList.add('spacer');
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

  appendChild('tableBody', fakeRow);
  appendChild('tableBody', row);
}
