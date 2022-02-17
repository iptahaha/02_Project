import { Person } from '../interfaces/person.interface';
import {MainState} from "../interfaces/mainState.interface";

export function addListener(id, eventType, callback) {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function removeListener(id, eventType, callback) {
  const node = document.getElementById(id);
  if (node) {
    node.removeEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function getElement(id): HTMLElement | boolean {
  const node = document.getElementById(id);

  if (node) {
    return node;
  }
  return false;
}

export function getInputValue(id): boolean | string {
  const input = <HTMLInputElement>document.getElementById(id);

  if (input) {
    return input.value;
  }
  return false;
}

export function setInputValue(id, value): boolean | string {
  const input = <HTMLInputElement>document.getElementById(id);

  if (input) {
    input.value = value;
    return true;
  }
  return false;
}

export function setTextValue(id, value): boolean {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.innerText = value;
    return true;
  }
  return false;
}

export function setHTMLValue(node, value): boolean {
  if (node) {
    node.innerHTML = value;
    return true;
  }
  return false;
}

export function addHTMLValue(node, value): boolean {
  if (node) {
    node.innerHTML += value;
    return true;
  }
  return false;
}

export function getForm(id): HTMLFormElement | boolean {
  const form = <HTMLFormElement>document.getElementById(id);

  if (form) {
    return form;
  }
  return false;
}

export function appendChild(id, value) {
  const node = document.getElementById(id);

  if (node) {
    node.appendChild(value);
    return true;
  }
  return false;
}

export function showOrHidePassword(buttonID, inputID): boolean {
  const input = <HTMLInputElement>getElement(inputID);
  const button = <HTMLElement>getElement(buttonID);

  if (input.type === 'password') {
    input.type = 'text';
    button.classList.remove('icon-show');
    button.classList.add('icon-hide');
    return true;
  }

  input.type = 'password';
  button.classList.add('icon-show');
  button.classList.remove('icon-hide');
  return false;
}

export function collectData(id): URLSearchParams {
  const data = new URLSearchParams();
  const formData = new FormData(<HTMLFormElement>getForm(id));
  console.log([...formData]);
  for (const values of formData) {
    data.append(values[0], <string>values[1]);
  }
  return data;
}

export function hasAttribute(node: HTMLElement, attribute: string): boolean {
  return node.hasAttribute(attribute);
}

export function removeChild(id): boolean {
  const node = document.getElementById(id);

  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    return true;
  }
  return false;
}

export function setDisabledAttribute(node: HTMLElement): boolean {
  if (node) {
    node.setAttribute('disabled', 'disabled');
    return true;
  }
  return false;
}

export function setDisabledAttributeByID(id: string): boolean {
  const node = document.getElementById(id);
  if (node) {
    node.setAttribute('disabled', 'disabled');
    return true;
  }
  return false;
}

export function removeDisabledAttribute(node: HTMLElement): boolean {
  if (node) {
    node.removeAttribute('disabled');
    return true;
  }
  return false;
}

export function removeDisabledAttributeByID(id: string): boolean {
  const node = document.getElementById(id);
  if (node) {
    node.removeAttribute('disabled');
    return true;
  }
  return false;
}

export function getSelector(selector) {
  return document.querySelector(selector);
}

export function checkLocalStorageThemeValue(value) {
  const page = getSelector('.page');
  const storageElement = localStorage.getItem(`${value}`);
  const selectElement = document.getElementById(`${value}`) as HTMLSelectElement;

  if (storageElement && selectElement.value !== storageElement) {
    page.classList.toggle('light-theme');
    page.classList.toggle('dark-theme');
    selectElement.value = storageElement;
    return true;
  }
}

export function changeInterfaceState(event) {
  const page = getSelector('.page');
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
  localStorage.setItem('changeTheme', event.target.value);
  checkLocalStorageThemeValue('changeTheme');
}

export function setDisplay(id: string, display: string) {
  const node = document.getElementById(id);
  if (node) {
    node.style.display = display;
    return true;
  }
  return false;
}

export function getClassList(node: HTMLElement): boolean | string[] {
  if (node) {
    return [...node.classList];
  }
  return false;
}

export function removeClass(node: HTMLElement, className: string): boolean {
  if (node) {
    node.classList.remove(className);
    return true;
  }
  return false;
}

export function addClass(id, className: string): boolean {
  const node = document.getElementById(id);

  if (node) {
    node.classList.add(className);
    return true;
  }
  return false;
}

export function validateStatusCheck(state, buttonId): boolean {
  const button = <HTMLElement>getElement(buttonId);
  if (state.includes(false)) {
    if (!hasAttribute(button, 'disabled')) {
      setDisabledAttribute(button);
    }
    return false;
  }
  removeDisabledAttribute(button);
  return true;
}

export function removeClassById(id, className: string): boolean {
  const node = document.getElementById(id);

  if (node) {
    node.classList.remove(className);
    return true;
  }
  return false;
}

export function getNodeList(className): NodeList | boolean {
  const NodeList = document.querySelectorAll(className);

  if (NodeList.length > 0) {
    return NodeList;
  }
  return false;
}

export function setAttribute(id, attribute, value): boolean {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.setAttribute(attribute, value);
    return true;
  }
  return false;
}

export function removeAttribute(id, attribute): boolean {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.removeAttribute(attribute);
    return true;
  }
  return false;
}

export function createTableRow(obj: Person) {
  const row = document.createElement('tr');
  row.id = obj.id.toString();
  row.classList.add('table__row');
  row.innerHTML = `
    <td>${obj.id}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
    <td>${obj.age}</td>
    <td>${obj.city}</td>
    <td>${obj.phoneNumber}</td>
    <td>${obj.email}</td>
    <td>${obj.companyName}</td>`;

  return row;
}

export function createRowCollection(data, sortValue) {
  const dataFragment = document.createDocumentFragment();
  data.sort((a: Person, b: Person) => (a[sortValue] > b[sortValue] ? 1 : -1));
  data.forEach((el: Person) => {
    dataFragment.append(createTableRow(el));
  });
  return dataFragment;
}

export function slice(state:MainState):any | boolean {
  if(state) {
    return state.currentData.slice()
  }
  return false;
}

export function trimToLowerCase(value:string):any {
  if(value) {
    value.trim().toLowerCase();
  }
}
