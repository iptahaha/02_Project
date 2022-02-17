import { removeDisabledAttributeByID, setDisabledAttributeByID } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

function selectRow(event, state) {
  const target = event.target.closest('tr');
  const previousRow = state.currentSelectedNode;

  if (target) {
    target.classList.add('table__row--active');
  }

  if (previousRow) {
    previousRow.classList.remove('table__row--active');
  }

  if (target === previousRow) {
    state.currentSelectedNode = null;
    state.currentSelectedId = null;
    state.currentSelectedObj = null;
    setDisabledAttributeByID('buttonDelete');
    setDisabledAttributeByID('buttonUpdate');
    return target.id;
  }

  state.currentData.forEach((el: Person) => {
    if (el.id === Number(target.id)) {
      state.currentSelectedObj = el;
    }
  });

  state.currentSelectedId = target.id;
  state.currentSelectedNode = target;
  removeDisabledAttributeByID('buttonDelete');
  removeDisabledAttributeByID('buttonUpdate');
  return target.id;
}

export function getClick(state) {
  selectRow(event, state);
  return state;
}
