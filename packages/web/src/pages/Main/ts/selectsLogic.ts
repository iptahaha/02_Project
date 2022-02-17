import {
  appendChild,
  createRowCollection,
  getInputValue,
  removeChild,
  setDisabledAttributeByID,
} from '../../../utils/ts/utils';
import { getData } from './getPersonDataLogic';

export function sortData(state) {
  const sortValue = <string>getInputValue('sort-by-select');
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

  removeChild('tableBody');
  appendChild('tableBody', createRowCollection(dataCopy, sortValue));
  return dataCopy;
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
