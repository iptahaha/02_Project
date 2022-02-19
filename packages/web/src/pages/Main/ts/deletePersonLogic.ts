import { removeDisabledAttributeByID, setDisabledAttributeByID } from '../../../utils/ts/utils';
import { closedModal } from './modal';

export function filterObjInState(stateArr, id) {
  return stateArr.filter((el) => {
    if (el.id !== Number(id)) {
      return el;
    }
  });
}

export function deleteRow(state): boolean {
  setDisabledAttributeByID('saveDelete');
  const deleteUrl = `${state.currentDB}/delete:${state.currentSelectedId}`;
  fetch(deleteUrl, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return false;
      }

      if (response.status === 200) {
        state.currentData = filterObjInState(state.currentData, state.currentSelectedNode.id);

        if (state.currentSortedData !== null) {
          state.currentSortedData = filterObjInState(state.currentSortedData, state.currentSelectedId);
        }

        state.currentSelectedNode.parentNode.removeChild(state.currentSelectedNode);
        state.currentSelectedNode = null;
        state.currentSelectedId = null;
        state.currentSelectedObj = null;
        return true;
      }
      setDisabledAttributeByID('buttonDelete');
      setDisabledAttributeByID('buttonUpdate');
      removeDisabledAttributeByID('saveDelete');
      closedModal('deleteModal');
    })
    .catch(() => {
      removeDisabledAttributeByID('saveDelete');
      closedModal('deleteModal');
      return false;
    });
  return false;
}
