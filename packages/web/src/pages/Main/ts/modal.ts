import { getQuerySelectorAll, setDisplay, setInputValue, setTextValue } from '../../../utils/ts/utils';
import { Person } from '../../../utils/interfaces/person.interface';

export function openModal(id: string): boolean {
  setDisplay(id, 'flex');
  return true;
}

export function fillUpdateModal(state): boolean {
  const currentObj: Person = state.currentSelectedObj;
  setInputValue('update-fname', currentObj.fname);
  setInputValue('update-lname', currentObj.lname);
  setInputValue('update-age', currentObj.age);
  setInputValue('update-phoneNumber', currentObj.phoneNumber);
  setInputValue('update-city', currentObj.city);
  setInputValue('update-email', currentObj.email);
  setInputValue('update-company', currentObj.companyName);

  openModal('modalUpdate');
  return true;
}

export function cleanForm() {
  const input = getQuerySelectorAll('input'); // document.querySelectorAll('input');
  input.forEach((el) => {
    if (el.id !== 'search') {
      el.value = '';
    }
  });
}

export function closedModal(id: string): void {
  setTextValue('create-form-error', '');
  setTextValue('update-form-error', '');
  setDisplay(id, 'none');
  cleanForm();
}
