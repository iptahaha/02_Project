import {
  appendChild,
  createRowCollection,
  getInputValue,
  removeChild,
  setDisabledAttributeByID,
  slice,
  setInputValue,
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
    dataCopy = slice(state.currentSortedData);
  } else {
    dataCopy = slice(state.currentData);
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
  setDisabledAttributeByID('data-base-select');
  removeChild('tableBody');
  setInputValue('search', '');
  getData(state);
  localStorage.setItem('changeDb', state.currentDB);
}
