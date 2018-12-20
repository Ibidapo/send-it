/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Profile input fields as variables
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const editProfileBtn = document.getElementById('edit-profile');
  const saveProfileBtn = document.getElementById('save-profile');

  // initialize Tab into variables
  const editProfileTab = document.getElementById('profile-form');
  const viewProfileTab = document.getElementById('profile-view');

  // Initialize Error or Success Containers
  const errorMsg = document.getElementById('profile-error');
  const successMsg = document.getElementById('profile-success');

  // Functions to abstract Fetch API
  const getResult = (data) => {
    const { success, user } = data;

    editProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
    errorMsg.classList.remove('active');
    successMsg.classList.add('active');
    successMsg.innerHTML = success;
    console.log(user);
  }
  const getError = (errors) => {
    errorMsg.classList.add('active');
    successMsg.classList.remove('active');
    if(errors.error === undefined){
      errorMsg.innerHTML = 'Network connection error occurred';
      return;
    }
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
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };
  const updateProfile = (fName, lName) => {
    fetch('https://travissend-it.herokuapp.com/api/v1/users/', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ firstName: fName, lastName: lName }),
    })
    .then(validateResponse)
    .then(getResult)
    .catch(getError);
  }
  
  // To edit Profile Tab
  editProfileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    editProfileTab.classList.add('active');
    viewProfileTab.classList.remove('active');
  });

  // To view Profile Tab
  saveProfileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const firstNameVal = firstName.value.trim();
    const lastNameVal = lastName.value.trim();

    if (firstNameVal === '' ||  lastNameVal === '') {
      errorMsg.classList.add('active');
      successMsg.classList.remove('active');
      errorMsg.innerHTML = 'First or Last name cannot be empty';
      return;
    }
    updateProfile(firstName.value, lastName.value);
    ProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
  });
});