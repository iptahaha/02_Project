import { addHTMLValue, collectData, getElement, removeDisabledAttributeByID, setDisabledAttributeByID, setHTMLValue,
  valueLength } from '../../../utils/ts/utils';
import { closedModal } from './modal';
import { validatePersonForm } from './validation';
import {updateContent} from "../../../utils/ts/localization";

export function generateNewRowContent(id, obj) {
  return `
          <td>${id}</td>
          <td>${obj.fname}</td>
          <td>${obj.lname}</td>
          <td>${obj.age}</td>
          <td>${obj.city}</td>
          <td>${obj.phoneNumber}</td>
          <td>${obj.email}</td>
          <td>${obj.companyName}</td>`;
}

export function updateObjInState(stateArr, id, newObj) {
  stateArr.map((el) => {
    if (el.id === Number(id)) {
      el.fname = newObj.fname;
      el.lname = newObj.lname;
      el.age = newObj.age;
      el.city = newObj.city;
      el.phoneNumber = newObj.phoneNumber;
      el.email = newObj.email;
      el.companyName = newObj.companyName;
      return el;
    }
    return el;
  });
  return stateArr;
}

export function updatePersonRequest(state, data, personObj) {
  const updateUrl = `${state.currentDB}/update:${state.currentSelectedId}`;
  fetch(updateUrl, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return false;
      }

      if (response.status === 200) {
        setHTMLValue(state.currentSelectedNode, generateNewRowContent(state.currentSelectedId, personObj));
        updateObjInState(state.currentData, state.currentSelectedId, personObj);

        if (state.currentSortedData !== null) {
          updateObjInState(state.currentSortedData, state.currentSelectedId, personObj);
        }
      }
      removeDisabledAttributeByID('updateButton');
      closedModal('modalUpdate');
      return true;
    })
    .catch(() => {
      removeDisabledAttributeByID('updateButton');
      closedModal('modalUpdate');
      return false;
    });
}

export function updatePerson(state) {
  const personData = collectData('update-form');
  const obj = Object.fromEntries(personData);
  const validateResult = validatePersonForm(obj);
  const formError = getElement('update-form-error');

  console.log(obj);
  if (valueLength(validateResult) > 0) {

    addHTMLValue(formError, '<span data-i18n="error.modal.message"></span>');
    console.log(validateResult);
    validateResult.forEach((span, idx) => {

      addHTMLValue(formError, span);
      if (idx !== <number>valueLength(validateResult) - 1) {
        addHTMLValue(formError, ', ');
      } else {
        addHTMLValue(formError, '.')
      }
    })
    updateContent();
    return false;
  }
  setDisabledAttributeByID('updateButton');
  updatePersonRequest(state, personData, obj);
  return true;
}
