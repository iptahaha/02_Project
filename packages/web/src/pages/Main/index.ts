import {
  getSelector,
  addListener,
  getAppendChild,
  checkLocalStorageValue,
} from '../../utils/ts/utils';
import '../../utils/styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  checkLocalStorageValue('changeTheme');
  // checkLocalStorageValue('changeLanguage');

    addListener('dropdownTheme', 'change', (event) => changeInterfaceState(event));
    addListener('dropdownLanguage', 'change', (event) => changeLng(event));
}

function changeInterfaceState(event) {
  const page = getSelector('.page');
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
  localStorage.setItem('changeTheme', event.target.value);
  checkLocalStorageValue('changeTheme');
}

// FETCH js and ts
// fetch('http://localhost:3000/main/mongo')
//   .then(function(response:Response, req:void) {
//     response.json().then(test)
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

// function api<T>(url: string): Promise<void | T> {
//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText)
//       }
//       return response.json()
//     }).then(data => data)
// }
//
// api('http://localhost:3000/main/mongo')
//   .then((data) => {
//     //console.log(data);
//     tableMongo(data);
//   })
//   .catch(error => {
//     console.log(error, 'err')
//   })

// function tableMongo(data) {
//   const mongo = document.getElementById('mongo');
//
//   //console.log(data)
//   let myTrHeader = document.createElement('tr');
//   myTrHeader.innerHTML = `
//           <td>Id</td>
//           <td>First name</td>
//           <td>Last name</td>
//           <td>City</td>
//           <td>Age</td>
//           <td>Phone number</td>
//           <td>E-mail</td>
//           <td>Company</td>`
//   getAppendChild(mongo, myTrHeader);
//
//   for (let i = 0; i < data.length; i++) {
//     const item = data[i];
//     let myTr = document.createElement('tr');
//     myTr.id = `${item.id}`;
//     myTr.innerHTML = `
//      <td>${i+1}</td>
//           <td>${item.firstname}</td>
//           <td>${item.lastname}</td>
//           <td>${item.city}</td>
//           <td>${item.age}</td>
//           <td>${item.phone}</td>
//           <td>${item.email}</td>
//           <td>${item.company}</td>`;
//     getAppendChild(mongo, myTr);
//   }
// }

// addListener('test', 'click', () => fetchPost())
// addListener('dropdownBD', 'click', () => dropdown('myDropdownBD', event));
// addListener('dropdownSort', 'click', () => dropdown('myDropdownSort', event));
//
// function dropdown(id, event) {
//   const dropdownId = document.getElementById(id)
//   dropdownId.classList.add("show");
//   if (!event.target.matches('.dropbtn')) {
//     const dropdowns = document.getElementsByClassName("dropdown-content");
//     for (let i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         //TODO: closet dropdowns
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

