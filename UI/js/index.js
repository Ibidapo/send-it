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
  // const registerBtn = document.getElementById('register-btn');
  // const loginBtn = document.getElementById('login-btn');

  // This event triggers the register tab and form to be active and visible
  registerTab.addEventListener('click', (event) => {
    event.preventDefault();
    registerTab.classList.add('active');
    registerForm.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.classList.remove('active');
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
});
