/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // assign html elements to variables
  const resetBtn = document.getElementById('reset-btn');
  const email = document.getElementById('reset-email');
  const errorMsg = document.getElementById('reset-error');
  const successMsg = document.getElementById('reset-success');

  // Functions to abstract Fetch API
  const sendMail = (result) => {
    if (errorMsg.classList.contains('active')) {
      errorMsg.classList.remove('active');
    }
    successMsg.classList.add('active');
    successMsg.innerHTML = result.success;
  }
  const displayError = (errors) => {
    errorMsg.classList.add('active');
    errorMsg.innerHTML = errors;
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
  const fetchEmail = (pathToResource, user) => {
    fetch(pathToResource, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user }),
    })
    .then(validateResponse)
    .then(sendMail)
    .catch(displayError);
  }

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetchEmail('https://travissend-it.herokuapp.com/api/v1/auth/forgotPassword', email.value);
  })
});
