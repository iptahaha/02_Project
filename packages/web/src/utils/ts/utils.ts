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

export function setTextValue(id, value): boolean {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.innerText = value;
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
  if (node.hasAttribute(attribute)) {
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

export function removeDisabledAttribute(node: HTMLElement) {
  if (node) {
    node.removeAttribute('disabled');
    return true;
  }
  return false;
}

export function getSelector(selector) {
  return document.querySelector(selector);
}

export function checkLocalStorageValue(value) {
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
  checkLocalStorageValue('changeTheme');
}
