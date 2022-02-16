import { setDisplay, setInputValue } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function openModal(id: string): void {
  setDisplay(id, 'block');
}

export function fillUpdateModal(state) {
  const currentObj: Person = state.currentSelectedObj;
  setInputValue('update-fname', currentObj.fname);
  setInputValue('update-lname', currentObj.lname);
  setInputValue('update-age', currentObj.age);
  setInputValue('update-phoneNumber', currentObj.phoneNumber);
  setInputValue('update-city', currentObj.city);
  setInputValue('update-email', currentObj.email);
  setInputValue('update-company', currentObj.companyName);

  openModal('modalUpdate');
}

export function cleanForm() {
  const input = document.querySelectorAll('input');
  input.forEach(( el) => (el.value = ''));
}

export function closedModal(id: string): void {
  setDisplay(id, 'none');
  cleanForm();
}
