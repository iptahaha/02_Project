import {
  collectData,
  removeDisabledAttributeByID,
  setDisabledAttributeByID,
  setHTMLValue,
  setTextValue,
} from '../../utils/ts/utils';
import { closedModal } from './modal';
import { validatePersonForm } from './validation';

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
        const node = state.currentSelectedNode;
        const id = state.currentSelectedId;

        setHTMLValue(node, generateNewRowContent(id, personObj));
        updateObjInState(state.currentData, id, personObj);

        if (state.currentSortedData !== null) {
          updateObjInState(state.currentSortedData, id, personObj);
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

  if (validateResult.length > 0) {
    setTextValue('update-form-error', `Incorrect data in field(s): ${validateResult.join(', ')}.`);
    return false;
  }
  setDisabledAttributeByID('updateButton');
  updatePersonRequest(state, personData, obj);
  return true;
}
