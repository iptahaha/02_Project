import { appendChild, createRowCollection, getInputValue, removeChild } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function filterByName(state) {
  const dataCopy = state.currentData.slice();
  const searchValue = <string>getInputValue('search');
  const sortValue = <string>getInputValue('sort-by-select');
  const sortByName = searchValue.trim().toLowerCase();

  if (sortByName.length === 0) {
    state.currentSortedData = null;
    removeChild('tableBody');
    appendChild('tableBody', createRowCollection(state.currentData, sortValue));
    return state;
  }

  state.currentSortedData = dataCopy.filter((el: Person) => {
    const fullNameFirstNameFirst = `${el.fname} ${el.lname}`;
    const fullNameLastNameFirst = `${el.lname} ${el.fname}`;
    if (fullNameFirstNameFirst.toLowerCase().includes(sortByName)) {
      return el;
    }
    if (fullNameLastNameFirst.toLowerCase().includes(sortByName)) {
      return el;
    }
  });
  removeChild('tableBody');
  appendChild('tableBody', createRowCollection(state.currentSortedData, sortValue));
  return state;
}
