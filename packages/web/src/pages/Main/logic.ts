import { Person } from '../../utils/interfaces/person.interface';
import {
  appendChild,
  getInputValue,
  removeChild,
  setDisabledAttributeByID,
} from '../../utils/ts/utils';
import { getData } from './getPesonDataLogic';

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

export function changeCurrentDB(state) {
  state.currentDB = <string>getInputValue('data-base-select');
  state.currentData = null;
  state.currentData = null;
  state.currentSelectedId = null;
  state.currentSelectedNode = null;
  state.currentSelectedObj = null;
  setDisabledAttributeByID('buttonDelete');
  setDisabledAttributeByID('buttonUpdate');
  removeChild('tableBody');
  getData(state);
  // TODO пусть возвращает все state yopta
}

export function sortData(state) {
  state.currentSelectedNode = null;
  state.currentSelectedId = null;
  state.currentSelectedObj = null;
  setDisabledAttributeByID('buttonDelete');
  setDisabledAttributeByID('buttonUpdate');
  let dataCopy;
  if (state.currentSortedData !== null) {
    dataCopy = state.currentSortedData.slice();
  } else {
    dataCopy = state.currentData.slice();
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

export function filterByName(state) {
  const dataCopy = state.currentData.slice();
  const searchValue = <string>getInputValue('search');
  const sortByValue = <string>getInputValue('sort-by-select');
  const sortByName = searchValue.trim().toLowerCase();

  if (sortByName.length === 0) {
    state.currentSortedData = null;
    removeChild('tableBody');
    const dataFragment = document.createDocumentFragment();
    state.currentData.forEach((el: Person) => {
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
  state.currentSortedData = filtered;
  removeChild('tableBody');
  const dataFragment = document.createDocumentFragment();
  filtered.forEach((el: Person) => {
    dataFragment.append(createTableRow(el));
  });
  appendChild('tableBody', dataFragment);
}
