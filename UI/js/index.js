/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');

  // assign html elements to variables
  const registerTab = document.getElementById('register-tab');
  const loginTab = document.getElementById('login-tab');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const registerBtn = document.getElementById('register-btn');
  const loginBtn = document.getElementById('login-btn');
  const passwordBtns = document.getElementsByClassName('password');

  // Initialize content-type
  const contentTypeJson = { 'Content-Type': 'application/json' };

  // This event triggers the register tab and form to be active and visible
  registerTab.addEventListener('click', (event) => {
    event.preventDefault();
    registerTab.classList.add('active');
    registerForm.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.classList.remove('active');
  });

   // This event triggers the Fetch API to post the user details
  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    fetch('https://travissend-it.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': contentTypeJson },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
  });

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    fetch('https://travissend-it.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': contentTypeJson },
      body: JSON.stringify({ email, password}),
    })
    .then((response) => response.JSON)
    .then((data) => console.log(data))
  });

  // This event triggers the login tab and form to be active and visible
  loginTab.addEventListener('click', (event) => {
    event.preventDefault();
    loginTab.classList.add('active');
    loginForm.classList.add('active');
    registerTab.classList.remove('active');
    registerForm.classList.remove('active');
  });

  // menu button transitions and toggles list item
  menuBtn.addEventListener('click', () => {
    if (menuBtn.classList.contains('active')) {
      menuBtn.classList.remove('active');
      tabList.classList.remove('active');
    } else {
      menuBtn.classList.add('active');
      tabList.classList.add('active');
    }
  });

  [...passwordBtns].forEach((passwordBtn) => {
    passwordBtn.addEventListener('click', () => {
      if (passwordBtn.classList.contains('fa-eye-slash')) {
        passwordBtn.previousElementSibling.setAttribute('type', 'text');
        passwordBtn.classList.remove('fa-eye-slash');
        passwordBtn.classList.add('fa-eye');
      } else {
        passwordBtn.previousElementSibling.setAttribute('type', 'password');
        passwordBtn.classList.remove('fa-eye');
        passwordBtn.classList.add('fa-eye-slash');
      }
    });
  });
});
