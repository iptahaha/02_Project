import "../../utils/styles/styles.scss"
import {addListener} from "../../utils/ts/utilts";

function fetchPost() {
  fetch('http://localhost:3000/auth/register', {
    method: "POST",
    body: "jopadd"
  })
}

addListener('test', 'click', () => fetchPost())
addListener('dropdownBD', 'click', () => dropdown('myDropdownBD', event));
addListener('dropdownSort', 'click', () => dropdown('myDropdownSort', event));

function dropdown(id, event) {
  const dropdownId = document.getElementById(id)
  dropdownId.classList.add("show");
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        //TODO: closet dropdowns
        openDropdown.classList.remove('show');
      }
    }
  }
}

