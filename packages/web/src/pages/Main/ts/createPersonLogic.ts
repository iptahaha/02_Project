import {
  collectData, getElement,
  removeChild,
  removeDisabledAttributeByID, setAttribute,
  setDisabledAttributeByID,
  addHTMLValue, setHTMLValue, deleteCookie,

} from '../../../utils/ts/utils';
import { validatePersonForm } from './validation';
import { closedModal } from './modal';
import { getData } from './getPersonDataLogic';
import { updateContent } from "../../../utils/ts/localization";

export function addNewPersonRequest(state, personData) {
  const addUrl = `${state.currentDB}/create`;
  fetch(addUrl, {
    method: 'POST',
    body: personData,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
        deleteCookie('jwt');
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
  const formError = getElement('create-form-error');
  setHTMLValue(formError, '');

  if (validateResult.length > 0) {

    addHTMLValue(formError, '<span data-i18n="error.modal.message"></span>');
    validateResult.forEach((span, idx) => {

      addHTMLValue(formError, span);
      if (idx !== validateResult.length - 1) {
        addHTMLValue(formError, ', ');
      } else {
        addHTMLValue(formError, '.')
      }
    })
    updateContent();
    return false;
  }
  setDisabledAttributeByID('createButton');
  addNewPersonRequest(state, personData);
  return true;
}
