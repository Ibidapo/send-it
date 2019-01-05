/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Profile input fields as variables
  const greeting = document.getElementById('greetings');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const mobileNosInput = document.getElementById('mobile-nos');
  const editProfileBtn = document.getElementById('edit-profile');
  const saveProfileBtn = document.getElementById('save-profile');
  const viewProfileBtn = document.getElementById('view-profile');

  // initialize Tab into variables
  const editProfileTab = document.getElementById('profile-form');
  const viewProfileTab = document.getElementById('profile-view');
  const editProfileFields = editProfileTab.children[0];
  const viewProfileFields = viewProfileTab.children[0];

  // Initialize Avatar form
  const avatarForm = document.forms.namedItem('avatar-form');

  // Function to assign localStorage
  const profileStorage = (arrs, index, item) => {
    arrs.forEach((arr) => {
      arr.children[index].children[1].innerHTML = localStorage.getItem(item);
    });
  }

  // Initialize variables with name contents in localStorage
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const phoneNos = localStorage.getItem('phoneNos');
  const avatar = localStorage.getItem('avatar')

  // Check for avatar url in localStorage
  if (avatar !== 'null') {
    greeting.children[1].src = `${avatar}`;
  }

  // Check for firstName in localStorage
  if (firstName !== 'null') {
    greeting.children[2].innerHTML = `${firstName} ${lastName}`;
    editProfileFields.children[0].children[1].value = firstName;
    editProfileFields.children[1].children[1].value = lastName;
    editProfileFields.children[2].children[1].value = phoneNos;
    profileStorage([viewProfileFields], 0, 'firstName');
    profileStorage([viewProfileFields], 1, 'lastName');
    profileStorage([viewProfileFields], 2, 'phoneNos');
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
    const { first_name, last_name, phone } = user;

    localStorage.setItem('firstName', first_name);
    localStorage.setItem('lastName', last_name);
    localStorage.setItem('phoneNos', phone);
    greeting.children[2].innerHTML = `${first_name} ${last_name}`;
    editProfileFields.children[0].children[1].value = first_name;
    editProfileFields.children[1].children[1].value = last_name;
    editProfileFields.children[2].children[1].value = phone;
    profileStorage([viewProfileFields], 0, 'firstName');
    profileStorage([viewProfileFields], 1, 'lastName');
    profileStorage([viewProfileFields], 2, 'phoneNos');
    editProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
    errorMsg.classList.remove('active');
    successMsg.classList.add('active');
    successMsg.innerHTML = success;
    saveProfileBtn.disabled = false;
  }
  const getImage = (data) => {
    const { success, user } = data;

    greeting.children[1].src = `${user.image_url}`;
    localStorage.setItem('avatar', user.image_url);
    if (modal.children[0].classList.contains('alert-error')) {
      modal.children[0].classList.remove('alert-error');
    }

    modal.classList.add('active');
    modal.children[0].classList.add('alert-success');
    modal.children[0].children[1].innerHTML = success;
  }
  const getError = (errors) => {
    errorMsg.classList.add('active');
    successMsg.classList.remove('active');
    saveProfileBtn.disabled = false;
    if (errors.error === undefined) {
      errorMsg.innerHTML = 'Network connection error occurred';
      return;
    }
    errorMsg.innerHTML = errors.error;
  }
  const getImageError = (errors) => {
    if (modal.children[0].classList.contains('alert-success')) {
      modal.children[0].classList.remove('alert-success');
    }
    modal.classList.add('active');
    modal.children[0].classList.add('alert-error');
    if (errors.error === undefined) {
      modal.children[0].children[1].innerHTML = 'Network connection error occurred';
      return;
    }
    modal.children[0].children[1].innerHTML = errors.error;
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
  const updateProfile = (fName, lName, mobileNos) => {
    fetch('https://travissend-it.herokuapp.com/api/v1/users/', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ 
        firstName: fName,
        lastName: lName,
        phone: mobileNos,
      }),
    })
    .then(validateResponse)
    .then(getResult)
    .catch(getError);
  }

  // To upload avatar
  avatarForm.addEventListener('change', () => {
    const form = new FormData(avatarForm);

    fetch('https://travissend-it.herokuapp.com/api/v1/users/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: form,
    })
    .then(validateResponse)
    .then(getImage)
    .catch(getImageError);
  })
  
  // To edit Profile Tab
  editProfileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    viewProfileTab.classList.remove('active');
    editProfileTab.classList.add('active');
  });

  viewProfileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    editProfileTab.classList.remove('active');
    viewProfileTab.classList.add('active');
    errorMsg.classList.remove('active');
    successMsg.classList.remove('active');
  });

  // To view Profile Tab
  saveProfileBtn.addEventListener('click', (event) => {
    event.preventDefault();
    saveProfileBtn.disabled = true;
    const firstNameVal = firstNameInput.value.trim();
    const lastNameVal = lastNameInput.value.trim();
    const mobileNosVal = mobileNosInput.value.trim();
    const nameRegex = /^[a-zA-Z]+$/;
    const phoneRegex = /^\d{11}$/;

    if (firstNameVal === '' || lastNameVal === '' || !nameRegex.test(firstNameVal) || !nameRegex.test(lastNameVal)) {
      errorMsg.classList.add('active');
      successMsg.classList.remove('active');
      errorMsg.innerHTML = 'Name cannot be empty or contain numbers';
      saveProfileBtn.disabled = false;
      return;
    }

    if (!phoneRegex.test(mobileNosVal)) {
      errorMsg.classList.add('active');
      successMsg.classList.remove('active');
      errorMsg.innerHTML = 'Phone number must be 11 digits';
      saveProfileBtn.disabled = false;
      return;
    }

    updateProfile(firstNameVal, lastNameVal, mobileNosVal);
  });
});