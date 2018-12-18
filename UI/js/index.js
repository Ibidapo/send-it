/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // assign html elements to variables
  const registerTab = document.getElementById('register-tab');
  const loginTab = document.getElementById('login-tab');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const registerBtn = document.getElementById('register-btn');
  const loginBtn = document.getElementById('login-btn');
  const passwordBtns = document.getElementsByClassName('password');

  // Functions to abstract Fetch API
  const redirectUser = (result) => {
    const { token } = result
    localStorage.setItem('token', token);
    window.location.replace('https://ibidapo.github.io/send-it/UI/user.html');
  }
  const displayError = (errors) => {
    const errorMsg = document.getElementById('sign-error');
    errorMsg.classList.add('active');
    errorMsg.innerHTML = errors.error;
  }
  const validateResponse = (response) => {
    return response.json()
      .then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
  }
  const fetchJSON = (pathToResource, user, pass) => {
    fetch(pathToResource, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user, password: pass }),
    })
    .then(validateResponse)
    .then(redirectUser)
    .catch(displayError);
  }

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

    fetchJSON('https://travissend-it.herokuapp.com/api/v1/auth/signup', email, password);
  });

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    fetchJSON('https://travissend-it.herokuapp.com/api/v1/auth/login', email, password);
  });

  // This event triggers the login tab and form to be active and visible
  loginTab.addEventListener('click', (event) => {
    event.preventDefault();
    loginTab.classList.add('active');
    loginForm.classList.add('active');
    registerTab.classList.remove('active');
    registerForm.classList.remove('active');
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
