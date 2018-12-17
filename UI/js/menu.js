/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');

  // Event listener for the Menu burger on mobile viewports
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