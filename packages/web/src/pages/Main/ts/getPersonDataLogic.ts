import {
  addClass,
  appendChild,
  createRowCollection,
  getInputValue,
  removeClassById,
  removeDisabledAttributeByID,
} from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function getData(state) {
  state.currentSortedData = null;
  const dataUrl = `${state.currentDB}/data`;
  addClass('loader', 'page__loader--active');
  fetch(dataUrl)
    .then((response: Response) => response.json())
    .then((data) => {
      state.currentData = [];
      data.forEach((el: Person) => {
        state.currentData.push(el);
      });
      const sortValue = <string>getInputValue('sort-by-select');
      appendChild('tableBody', createRowCollection(state.currentData, sortValue));
      removeClassById('loader', 'page__loader--active');
      removeDisabledAttributeByID('data-base-select');
      return true;
    })
    .catch(() => false);
  return true;
}
