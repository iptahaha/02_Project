import { addElementClass, addId, removeClass, removeDisabledAttributeByID,
  setDisabledAttributeByID, targetValueClosest } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function selectRow(event, state) {
  const target = targetValueClosest(event, 'tr');
  const previousRow = state.currentSelectedNode;

  if (target) {
    addElementClass(target, 'table__row--active');
  }

  if (previousRow) {
    removeClass(previousRow, 'table__row--active');
  }

  if (target === previousRow) {
    state.currentSelectedNode = null;
    state.currentSelectedId = null;
    state.currentSelectedObj = null;
    setDisabledAttributeByID('buttonDelete');
    setDisabledAttributeByID('buttonUpdate');
    return addId(target);
  }

  state.currentData.forEach((el: Person) => {
    if (el.id === Number(addId(target))) {
      state.currentSelectedObj = el;
    }
  });

  state.currentSelectedId = addId(target);
  state.currentSelectedNode = target;
  removeDisabledAttributeByID('buttonDelete');
  removeDisabledAttributeByID('buttonUpdate');
  return addId(target);
}

export function getClick(state) {
  selectRow(event, state);
  return state;
}
