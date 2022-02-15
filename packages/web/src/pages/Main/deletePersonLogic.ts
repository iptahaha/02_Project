import { removeDisabledAttributeByID, setDisabledAttributeByID } from '../../utils/ts/utils';
import { closedModal } from './modal';

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
        state.currentData = state.currentData.filter((el) => {
          if (el.id !== Number(state.currentSelectedNode.id)) {
            return el;
          }
        });

        if (state.currentSortedData !== null) {
          state.currentSortedData = state.currentSortedData.filter((el) => {
            if (el.id !== Number(state.currentSelectedNode.id)) {
              return el;
            }
          });
        }

        state.currentSelectedNode.parentNode.removeChild(state.currentSelectedNode);
        setDisabledAttributeByID('buttonDelete');
        setDisabledAttributeByID('buttonUpdate');
        state.currentSelectedNode = null;
        state.currentSelectedId = null;
        removeDisabledAttributeByID('saveDelete');
        closedModal('deleteModal');
        return true;
      }
    })
    .catch(() => {
      removeDisabledAttributeByID('saveDelete');
      closedModal('deleteModal');
      return false;
    });
  return false;
}
