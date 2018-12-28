/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://ibidapo.github.io/send-it/UI/');
  });
});
