import { stat } from 'copy-webpack-plugin/types/utils';
import { Person } from '../../utils/interfaces/person.interface';
import {
  addClass,
  appendChild,
  collectData,
  getClassList,
  getElement,
  getInputValue,
  getNodeList,
  removeChild,
  removeClassById,
  setTextValue,
} from '../../utils/ts/utils';
import { closedModal } from './modal';
import { validatePersonForm } from './validation';

export function createTableRow(obj: Person) {
  const row = document.createElement('tr');
  row.id = obj.id.toString();
  row.classList.add('table__row');
  row.innerHTML = `
    <td>${obj.id}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
    <td>${obj.age}</td>
    <td>${obj.city}</td>
    <td>${obj.phoneNumber}</td>
    <td>${obj.email}</td>
    <td>${obj.companyName}</td>`;

  return row;
}

export function getData(url, state) {
  const dataUrl = `${url}/data`;
  addClass('loader', 'page__loader--active');
  fetch(dataUrl)
    .then((response: Response) => response.json())
    .then((data) => {
      state.currentData = [];
      data.forEach((el: Person) => {
        state.currentData.push(el);
      });
      const dataToSort = state.currentData;
      const sortByValue = <string>getInputValue('sort-by-select');
      const dataFragment = document.createDocumentFragment();
      dataToSort.sort((a: Person, b: Person) => (a[sortByValue] > b[sortByValue] ? 1 : -1));
      dataToSort.forEach((el: Person) => {
        dataFragment.append(createTableRow(el));
      });
      appendChild('tableBody', dataFragment);
      removeClassById('loader', 'page__loader--active');
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addNewPerson(dbState, dataState): boolean {
  const obj: Person = {
    age: Number(getInputValue('create-age')),
    city: <string>getInputValue('create-city'),
    companyName: <string>getInputValue('create-company'),
    email: <string>getInputValue('create-email'),
    fname: <string>getInputValue('create-fname'),
    lname: <string>getInputValue('create-lname'),
    phoneNumber: <string>getInputValue('create-phoneNumber'),
  };

  const validateResult = validatePersonForm(obj);

  if (validateResult.length > 0) {
    setTextValue('create-form-error', `Incorrect data in field(s): ${validateResult.join(', ')}.`);
    return false;
  }

  const personData = collectData('create-form');
  const addUrl = `${dbState.currentDB}/create`;
  fetch(addUrl, {
    method: 'POST',
    body: personData,
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return false;
    }

    removeChild('tableBody');
    getData(dbState.currentDB, dataState);
    closedModal('modalCreate');
    return true;
  });
  return true;
}

export function deleteRow(dbState, dataState, controlState): boolean {
  const deleteUrl = `${dbState.currentDB}/delete:${controlState.currentSelect}`;
  fetch(deleteUrl, {
    method: 'DELETE',
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return false;
    }

    removeChild('tableBody');
    getData(dbState.currentDB, dataState);
    closedModal('deleteModal');
    return true;
  });
  return true;
}

export function clearAll(dbState, dataState) {
  const clearUrl = `${dbState.currentDB}/clear`;
  fetch(clearUrl, {
    method: 'DELETE',
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
      return false;
    }

    dataState.currentData = [];
    removeChild('tableBody');
    // getData(dbState.currentDB, dataState);
    closedModal('clearModal');
    return true;
  });
  return true;
}

export function sortData(dataState, sortedData) {
  let dataCopy;
  if (sortedData.currentData !== null) {
    dataCopy = sortedData.currentData.slice();
  } else {
    dataCopy = dataState.currentData.slice();
  }
  const sortByValue = <string>getInputValue('sort-by-select');
  dataCopy.sort((a: Person, b: Person) => (a[sortByValue] > b[sortByValue] ? 1 : -1));
  removeChild('tableBody');
  const dataFragment = document.createDocumentFragment();
  dataCopy.forEach((el: Person) => {
    dataFragment.append(createTableRow(el));
  });
  appendChild('tableBody', dataFragment);
  return dataCopy;
}

export function filterByName(dataState, sortedData) {
  const dataCopy = dataState.currentData.slice();
  const searchValue = <string>getInputValue('search');
  const sortByValue = <string>getInputValue('sort-by-select');
  const sortByName = searchValue.trim().toLowerCase();

  if (sortByName.length === 0) {
    sortedData.currentData = null;
    const dataFragment = document.createDocumentFragment();
    dataState.currentData.forEach((el: Person) => {
      dataFragment.append(createTableRow(el));
    });
    appendChild('tableBody', dataFragment);
    return;
  }

  const filtered = dataCopy.filter((el: Person) => {
    const fullNameFirstNameFirst = `${el.fname} ${el.lname}`;
    const fullNameLastNameFirst = `${el.lname} ${el.fname}`;
    if (fullNameFirstNameFirst.toLowerCase().includes(sortByName)) {
      return el;
    }
    if (fullNameLastNameFirst.toLowerCase().includes(sortByName)) {
      return el;
    }
  });
  filtered.sort((a: Person, b: Person) => (a[sortByValue] > b[sortByValue] ? 1 : -1));
  sortedData.currentData = filtered;
  removeChild('tableBody');
  const dataFragment = document.createDocumentFragment();
  filtered.forEach((el: Person) => {
    dataFragment.append(createTableRow(el));
  });
  appendChild('tableBody', dataFragment);
}

function selectRow(event) {
  const target = event.target.closest('tr');
  const tableList = <NodeList>getNodeList('.table__row');
  tableList.forEach((el: HTMLElement) => {
    const elClassList = <string[]>getClassList(el);
    if (elClassList.includes('table__row--active')) {
      el.classList.remove('table__row--active');
    }
  });

  target.classList.add('table__row--active');
  return target.id;
}

export function getClick(controlState) {
  controlState.currentSelect = selectRow(event);
  return controlState;
}
