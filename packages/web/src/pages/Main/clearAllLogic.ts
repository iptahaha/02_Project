import {
  removeChild,
  removeDisabledAttributeByID,
  setDisabledAttributeByID,
} from '../../utils/ts/utils';
import { closedModal } from './modal';

export function clearAll(state) {
  setDisabledAttributeByID('saveClear');
  const clearUrl = `${state.currentDB}/clear`;
  fetch(clearUrl, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return false;
      }

      state.currentData = null;
      state.currentSortedData = null;
      removeChild('tableBody');
      removeDisabledAttributeByID('saveClear');
      closedModal('clearModal');
      return true;
    })
    .catch(() => {
      removeDisabledAttributeByID('saveClear');
      closedModal('clearModal');
      return false;
    });
  return false;
}
