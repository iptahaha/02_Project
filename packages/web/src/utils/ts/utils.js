"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.createRowCollection = exports.createTableRow = exports.removeAttribute = exports.setAttribute = exports.getNodeList = exports.removeClassById = exports.validateStatusCheck = exports.addClass = exports.removeClass = exports.getClassList = exports.setDisplay = exports.changeInterfaceState = exports.checkLocalStorageValue = exports.getSelector = exports.removeDisabledAttributeByID = exports.removeDisabledAttribute = exports.setDisabledAttributeByID = exports.setDisabledAttribute = exports.removeChild = exports.hasAttribute = exports.collectData = exports.showOrHidePassword = exports.appendChild = exports.getForm = exports.addHTMLValue = exports.setHTMLValue = exports.setTextValue = exports.setInputValue = exports.getInputValue = exports.getElement = exports.removeListener = exports.addListener = void 0;
function addListener(id, eventType, callback) {
    const node = document.getElementById(id);
    if (node) {
        node.addEventListener(eventType, callback);
        return true;
    }
    return false;
}
exports.addListener = addListener;
function removeListener(id, eventType, callback) {
    const node = document.getElementById(id);
    if (node) {
        node.removeEventListener(eventType, callback);
        return true;
    }
    return false;
}
exports.removeListener = removeListener;
function getElement(id) {
    const node = document.getElementById(id);
    if (node) {
        return node;
    }
    return false;
}
exports.getElement = getElement;
function getInputValue(id) {
    const input = document.getElementById(id);
    if (input) {
        return input.value;
    }
    return false;
}
exports.getInputValue = getInputValue;
function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) {
        input.value = value;
        return true;
    }
    return false;
}
exports.setInputValue = setInputValue;
function setTextValue(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.innerText = value;
        return true;
    }
    return false;
}
exports.setTextValue = setTextValue;
function setHTMLValue(node, value) {
    if (node) {
        node.innerHTML = value;
        return true;
    }
    return false;
}
exports.setHTMLValue = setHTMLValue;
function addHTMLValue(node, value) {
    if (node) {
        node.innerHTML += value;
        return true;
    }
    return false;
}
exports.addHTMLValue = addHTMLValue;
function getForm(id) {
    const form = document.getElementById(id);
    if (form) {
        return form;
    }
    return false;
}
exports.getForm = getForm;
function appendChild(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.appendChild(value);
        return true;
    }
    return false;
}
exports.appendChild = appendChild;
function showOrHidePassword(buttonID, inputID) {
    const input = getElement(inputID);
    const button = getElement(buttonID);
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
exports.showOrHidePassword = showOrHidePassword;
function collectData(id) {
    const data = new URLSearchParams();
    const formData = new FormData(getForm(id));
    for (const values of formData) {
        data.append(values[0], values[1]);
    }
    return data;
}
exports.collectData = collectData;
function hasAttribute(node, attribute) {
    return node.hasAttribute(attribute);
}
exports.hasAttribute = hasAttribute;
function removeChild(id) {
    const node = document.getElementById(id);
    if (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return true;
    }
    return false;
}
exports.removeChild = removeChild;
function setDisabledAttribute(node) {
    if (node) {
        node.setAttribute('disabled', 'disabled');
        return true;
    }
    return false;
}
exports.setDisabledAttribute = setDisabledAttribute;
function setDisabledAttributeByID(id) {
    const node = document.getElementById(id);
    if (node) {
        node.setAttribute('disabled', 'disabled');
        return true;
    }
    return false;
}
exports.setDisabledAttributeByID = setDisabledAttributeByID;
function removeDisabledAttribute(node) {
    if (node) {
        node.removeAttribute('disabled');
        return true;
    }
    return false;
}
exports.removeDisabledAttribute = removeDisabledAttribute;
function removeDisabledAttributeByID(id) {
    const node = document.getElementById(id);
    if (node) {
        node.removeAttribute('disabled');
        return true;
    }
    return false;
}
exports.removeDisabledAttributeByID = removeDisabledAttributeByID;
function getSelector(selector) {
    return document.querySelector(selector);
}
exports.getSelector = getSelector;
function checkLocalStorageValue(value) {
    const page = getSelector('.page');
    const storageElement = localStorage.getItem(`${value}`);
    const selectElement = document.getElementById(`${value}`);
    if (storageElement && selectElement.value !== storageElement) {
        page.classList.toggle('light-theme');
        page.classList.toggle('dark-theme');
        selectElement.value = storageElement;
        return true;
    }
}
exports.checkLocalStorageValue = checkLocalStorageValue;
function changeInterfaceState(event) {
    const page = getSelector('.page');
    page.classList.toggle('light-theme');
    page.classList.toggle('dark-theme');
    localStorage.setItem('changeTheme', event.target.value);
    checkLocalStorageValue('changeTheme');
}
exports.changeInterfaceState = changeInterfaceState;
function setDisplay(id, display) {
    const node = document.getElementById(id);
    if (node) {
        node.style.display = display;
        return true;
    }
    return false;
}
exports.setDisplay = setDisplay;
function getClassList(node) {
    if (node) {
        return [...node.classList];
    }
    return false;
}
exports.getClassList = getClassList;
function removeClass(node, className) {
    if (node) {
        node.classList.remove(className);
        return true;
    }
    return false;
}
exports.removeClass = removeClass;
function addClass(id, className) {
    const node = document.getElementById(id);
    if (node) {
        node.classList.add(className);
        return true;
    }
    return false;
}
exports.addClass = addClass;
function validateStatusCheck(state, buttonId) {
    const button = getElement(buttonId);
    cancel(button);
    if (state.includes(false)) {
        if (!hasAttribute(button, 'disabled')) {
            setDisabledAttribute(button);
        }
        return false;
    }
    removeDisabledAttribute(button);
    return true;
}
exports.validateStatusCheck = validateStatusCheck;
function removeClassById(id, className) {
    const node = document.getElementById(id);
    if (node) {
        node.classList.remove(className);
        return true;
    }
    return false;
}
exports.removeClassById = removeClassById;
function getNodeList(className) {
    const NodeList = document.querySelectorAll(className);
    if (NodeList.length > 0) {
        return NodeList;
    }
    return false;
}
exports.getNodeList = getNodeList;
function setAttribute(id, attribute, value) {
    const node = document.getElementById(id);
    if (node) {
        node.setAttribute(attribute, value);
        return true;
    }
    return false;
}
exports.setAttribute = setAttribute;
function removeAttribute(id, attribute) {
    const node = document.getElementById(id);
    if (node) {
        node.removeAttribute(attribute);
        return true;
    }
    return false;
}
exports.removeAttribute = removeAttribute;
function createTableRow(obj) {
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
exports.createTableRow = createTableRow;
function createRowCollection(data, sortValue) {
    const dataFragment = document.createDocumentFragment();
    data.sort((a, b) => (a[sortValue] > b[sortValue] ? 1 : -1));
    data.forEach((el) => {
        dataFragment.append(createTableRow(el));
    });
    return dataFragment;
}
exports.createRowCollection = createRowCollection;
function deleteCookie(cookieName) {
    const timestamp = new Date();
    timestamp.setTime(timestamp.getTime() - 1);
    document.cookie = cookieName += '=; expires=' + timestamp.toUTCString();
}
exports.deleteCookie = deleteCookie;
//# sourceMappingURL=utils.js.map
