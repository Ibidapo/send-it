/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Profile input fields as variables
  const greeting = document.getElementById('greetings');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const editProfileBtn = document.getElementById('edit-profile');
  const saveProfileBtn = document.getElementById('save-profile');

  // initialize Tab into variables
  const editProfileTab = document.getElementById('profile-form');
  const viewProfileTab = document.getElementById('profile-view');
  const editProfileFields = editProfileTab.children[0];
  const viewProfileFields = viewProfileTab.children[0];

  // Function to assign localStorage
  const profileStorage = (arrs, index, item) => {
    arrs.forEach((arr) => {
      arr.children[index].children[1].innerHTML = localStorage.getItem(item);
    });
  }

  // Initialize variables with name contents in localStorage
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  // Insert User/Admin name if updated
  if (localStorage.getItem('firstName') !== 'null') {
    greeting.children[1].innerHTML = `${firstName} ${lastName}`;
    editProfileFields.children[0].children[1].value = firstName;
    editProfileFields.children[1].children[1].value = lastName;
    editProfileFields.children[2].children[1].value = 08011223344;
    profileStorage([viewProfileFields], 0, 'firstName');
    profileStorage([viewProfileFields], 1, 'lastName');
    viewProfileFields.children[2].children[1].innerHTML = '08011223344';
  }

  // profileStorage([viewProfileFields], 2, '08011223344');
  profileStorage([viewProfileFields, editProfileFields], 3, 'email');
  profileStorage([viewProfileFields, editProfileFields], 4, 'userId');
  profileStorage([viewProfileFields, editProfileFields], 5, 'joined');

  // Initialize Error or Success Containers
  const errorMsg = document.getElementById('profile-error');
  const successMsg = document.getElementById('profile-success');

  // Functions to abstract Fetch API
  const getResult = (data) => {
    const { success, user } = data;
    const { first_name, last_name } = user;

    localStorage.setItem('firstName', first_name);
    localStorage.setItem('lastName', last_name);
    greeting.children[1].innerHTML = `${first_name} ${last_name}`;
    editProfileFields.children[0].children[1].value = first_name;
    editProfileFields.children[1].children[1].value = last_name;
    profileStorage([viewProfileFields], 0, 'firstName');
    profileStorage([viewProfileFields], 1, 'lastName');
    editProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
    errorMsg.classList.remove('active');
    successMsg.classList.add('active');
    successMsg.innerHTML = success;
  }
  const getError = (errors) => {
    errorMsg.classList.add('active');
    successMsg.classList.remove('active');
    if (errors.error === undefined) {
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
    const firstNameVal = firstNameInput.value.trim();
    const lastNameVal = lastNameInput.value.trim();

    if (firstNameVal === '' || lastNameVal === '') {
      errorMsg.classList.add('active');
      successMsg.classList.remove('active');
      errorMsg.innerHTML = 'First or Last name cannot be empty';
      return;
    }
    updateProfile(firstNameVal, lastNameVal);
    editProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
  });
});