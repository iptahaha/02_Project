import { appendChild, createRowCollection, getInputValue, includes, removeChild, slice,
  trimToLowerCase, valueLength} from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';
import {MainState} from "../../../utils/interfaces/mainState.interface";

export function filterByName(state:MainState):MainState {
  const dataCopy:Person[] = slice(state.currentData);
  const searchValue = <string>getInputValue('search');
  const sortValue = <string>getInputValue('sort-by-select');
  const sortByName = trimToLowerCase(searchValue);

  if (valueLength(sortByName) === 0) {
    state.currentSortedData = null;
    removeChild('tableBody');
    appendChild('tableBody', createRowCollection(state.currentData, sortValue));
    return state;
  }

  state.currentSortedData = dataCopy.filter((el: Person) => {
    const fullNameFirstNameFirst = `${el.fname} ${el.lname}`;
    const fullNameLastNameFirst = `${el.lname} ${el.fname}`;
    if(includes(fullNameFirstNameFirst, sortByName)) {
      return el;
    }
    if(includes(fullNameLastNameFirst, sortByName)) {
      return el;
    }
  });
  removeChild('tableBody');
  appendChild('tableBody', createRowCollection(state.currentSortedData, sortValue));
  return state;
}
