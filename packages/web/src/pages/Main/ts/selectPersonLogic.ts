import { addElementClass, addId, removeClass, removeDisabledAttributeByID,
  setDisabledAttributeByID, targetValueClosest } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function selectRow(event, state) {
  const target = targetValueClosest(event, 'tr')//event.target.closest('tr');
  const previousRow = state.currentSelectedNode;

  if (target) {
    addElementClass(target, 'table__row--active');// target.classList.add('table__row--active');
  }

  if (previousRow) {
    removeClass(previousRow, 'table__row--active')// previousRow.classList.remove('table__row--active');
  }

  if (target === previousRow) {
    state.currentSelectedNode = null;
    state.currentSelectedId = null;
    state.currentSelectedObj = null;
    setDisabledAttributeByID('buttonDelete');
    setDisabledAttributeByID('buttonUpdate');
    return addId(target);//target.id;
  }

  state.currentData.forEach((el: Person) => {
    if (el.id === Number(addId(target))) {//Number(target.id)) {
      state.currentSelectedObj = el;
    }
  });

  state.currentSelectedId = addId(target);//target.id;
  state.currentSelectedNode = target;
  removeDisabledAttributeByID('buttonDelete');
  removeDisabledAttributeByID('buttonUpdate');
  return addId(target);//target.id;
}

export function getClick(state) {
  selectRow(event, state);
  return state;
}
