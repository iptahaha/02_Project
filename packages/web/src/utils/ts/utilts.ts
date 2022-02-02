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

export function getElement(id): HTMLElement | boolean
  {
  const node = document.getElementById(id)

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

export function getAppendChild(id, value) {
  id.appendChild(value);
}

export function showOrHidePassword(buttonID, inputID): boolean {
  const input = <HTMLInputElement>getElement(inputID)
  const button = <HTMLElement>getElement(buttonID)

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

export function collectData(id) {
  const data = new URLSearchParams();
  for (let values of new FormData(<HTMLFormElement>getForm(id))) {
    data.append(values[0], <string>values[1]);
  }
  return data
}