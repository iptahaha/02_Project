import {
  appendChild,
  createRowCollection,
  getInputValue,
  removeChild,
  slice,
  trimToLowerCase
} from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';
import {MainState} from "../../../utils/interfaces/mainState.interface";

export function filterByName(state:MainState):MainState {
  const dataCopy = slice(state)//state.currentData.slice();
  const searchValue = <string>getInputValue('search');
  const sortValue = <string>getInputValue('sort-by-select');
  const sortByName = trimToLowerCase(searchValue);//searchValue.trim().toLowerCase();

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
