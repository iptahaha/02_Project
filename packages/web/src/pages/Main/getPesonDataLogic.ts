import { addClass, appendChild, getInputValue, removeClassById } from '../../utils/ts/utils';
import { Person } from '../../utils/interfaces/person.interface';
import { createTableRow } from './logic';

export function getData(state) {
  const dataUrl = `${state.currentDB}/data`;
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
      return true;
    })
    .catch(() => false);
  return true;
}
