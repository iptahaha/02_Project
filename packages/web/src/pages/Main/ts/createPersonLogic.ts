import {
  collectData,
  removeChild,
  removeDisabledAttributeByID,
  setDisabledAttributeByID,
  setTextValue,
} from '../../../utils/ts/utils';
import { validatePersonForm } from './validation';
import { closedModal } from './modal';
import { getData } from './getPersonDataLogic';

export function addNewPersonRequest(state, personData) {
  const addUrl = `${state.currentDB}/create`;
  fetch(addUrl, {
    method: 'POST',
    body: personData,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        return false;
      }

      removeChild('tableBody');
      getData(state);
      removeDisabledAttributeByID('createButton');
      closedModal('modalCreate');
      return true;
    })
    .catch(() => {
      removeDisabledAttributeByID('createButton');
      closedModal('modalCreate');
      return false;
    });
}

export function addNewPerson(state): boolean {
  const personData = collectData('create-form');
  const obj = Object.fromEntries(personData);
  const validateResult = validatePersonForm(obj);

  if (validateResult.length > 0) {
    setTextValue('create-form-error', `Incorrect data in field(s): ${validateResult.join(', ')}.`);
    return false;
  }
  setDisabledAttributeByID('createButton');
  addNewPersonRequest(state, personData);
  return true;
}
