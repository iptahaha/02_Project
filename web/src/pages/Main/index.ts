import './style.scss'

const test = document.getElementById('test');

test.addEventListener('click', () => {
 fetch('http://localhost:3000/auth/register', {
   method: "POST",
   body: "jopadd"
 })
})

