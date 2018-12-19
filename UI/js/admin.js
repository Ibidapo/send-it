/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Tab Buttons into variables
  const dashboardTabBtn = document.getElementById('dashboard-tab-btn');
  const viewAllTabBtn = document.getElementById('view-all-tab-btn');
  const viewPendingTabBtn = document.getElementById('view-pending-tab-btn');
  const viewDeliveredTabBtn = document.getElementById('view-delivered-tab-btn');
  const profileTabBtn = document.getElementById('profile-tab-btn');
  const editProfileBtn = document.getElementById('edit-profile');
  const saveProfileBtn = document.getElementById('save-profile');

  // initialize Tab into variables
  const dashboardTab = document.getElementById('dashboard-tab');
  const viewAllTab = document.getElementById('view-all-tab');
  const viewPendingTab = document.getElementById('view-pending-tab');
  const viewDeliveredTab = document.getElementById('view-delivered-tab');
  const profileTab = document.getElementById('profile-tab');
  const editProfileTab = document.getElementById('profile-form');
  const viewProfileTab = document.getElementById('profile-view');
  const arrayTab = [dashboardTab, viewAllTab, viewPendingTab, viewDeliveredTab, profileTab, dashboardTabBtn, viewAllTabBtn, viewPendingTabBtn, viewDeliveredTabBtn, profileTabBtn];

  // Initialize containers for dynamically generated parcel box
  const viewAllBox = document.getElementById('view-all-box');
  const viewPendingBox = document.getElementById('view-pending-box');
  const viewDeliveredBox = document.getElementById('view-delivered-box');

  // Initialize all the parcel-box elements
  let parcelInfo;
  let parcelLocationTextNode;
  let parcelLocationInputNode;
  let editBtnNode;

  // Functions for toggling Display
  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };

  // Function to remove active class
  const removeActiveClass = (arr) => {
    arr
      .filter(button => button.classList.contains('active'))
      .forEach(button => button.classList.remove('active'));
  };

  // Variable for abstracting Fetch API
  const validateResponse = (response) => {
    return response.json()
      .then((json) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
  };
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  // Function to check for Parcel Status
  const checkStatus = (status) => {
    if (status === 'In Transit') {
      return `
        <a title="Deliver Order" class="yellow deliver-parcel-btn"><i class="fas fa-check-square"></i></a>
        <a title="Edit Order" class="blue edit-parcel-info"><i class="fas fa-pencil-alt"></i></a>`;
    }
    return `
    <a class="not-allowed"><i class="fas fa-check-square"></i></a>
    <a class="not-allowed"><i class="fas fa-pencil-alt"></i></a>`;
  }

  // Function to create new Parcel Node
  const createParcelBox = (parcel) => `
  <div class="box py-1 my-1">
    <div class="parcel-box d-flex space-between mx-auto text-center">
      <div class="w-20"><span>Order:</span> <b>#</b> <b>${parcel.parcel_id}</b></div>
      <div class="w-20"><span>Status:</span> <b>${parcel.status}</b></div>
      <div class="w-20"><span>Quote:</span> <b>&#8358; -----</b></div>
      <div class="w-20"><span>${parcel.created}</span></div>
      <div class="w-20 icon d-flex space-evenly">
        ${checkStatus(parcel.status)}
        <a title="Click to view" class="green view-parcel-info"><i class="fas fa-caret-down"></i></a>
      </div>
      <div class="w-100 parcel-info d-flex space-start my-1 mx-auto text-left">
        <div class="w-50">
          <div class="w-100"><h4 class="my-05 mb-0">From</h4></div>
          <div class="w-100 mt-05"><span>Address:</span> <b>${parcel.sender_address}</b></div>
          <div class="w-100 mt-05"><span>Weight:</span> <b>${parcel.parcel_kg}kg</b></div>
        </div>
        <div class="w-50">
          <div class="w-100"><h4 class="my-05 mb-0">To</h4></div>
          <div class="w-100 mt-05"><span>Address:</span> <b>${parcel.recipient_address}</b></div>
          <div class="w-100 mt-05">
            <span>Present Location:</span> <b>${parcel.present_location}</b>
            <input type="text" value="${parcel.present_location}">
          </div>
          <div class="w-100 mt-05"><span>Phone:</span> <b>${parcel.recipient_phone}</b></div>
        </div>
        <div class="w-100 mt-1 text-center">
          <button class="edit-parcel-button">save</button>
        </div>
      </div>
    </div>
  </div>`;

  // Function to fetch Parcels
  const fetchParcels = (state, successId, errorId, container) => {
    fetch('https://travissend-it.herokuapp.com/api/v1/parcels', { headers })
    .then(validateResponse)
    .then((data) => {
      const successMsg = document.getElementById(successId);
      const { success, parcels } = data

      successMsg.classList.add('active');
      successMsg.innerHTML = success;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      if (state === 'In Transit' || state === 'Delivered') {
        parcels.filter((parcel) => parcel.status === state).forEach((parcel) => {
          let parcelBox = createParcelBox(parcel);
          container.insertAdjacentHTML('beforeend', parcelBox);
        })
      } else {
        parcels.forEach((parcel) => {
          let parcelBox = createParcelBox(parcel);
          container.insertAdjacentHTML('beforeend', parcelBox);
        })
      }

      const viewExpandBtns = document.getElementsByClassName('view-parcel-info');
      const editExpandBtns = document.getElementsByClassName('edit-parcel-info');
      const deliverParcelBtns = document.getElementsByClassName('deliver-parcel-btn');
      const editParcelBtns = document.getElementsByClassName('edit-parcel-button');
      
      accordionListeners(viewExpandBtns, editExpandBtns, 'inline-block', 'none', 'none');
      accordionListeners(editExpandBtns, viewExpandBtns, 'none', 'inline-block', 'block');
      deliverBtnListeners(deliverParcelBtns);
      editBtnListeners(editParcelBtns);
    })
    .catch((errors) => {
      const errorMsg = document.getElementById(errorId);
      errorMsg.classList.add('active');
      errorMsg.innerHTML = errors.error;
    });
  };

  // Function to update a specific Parcels
  const updateParcel = (el, parcelId, presentLocation) => {
    fetch(`https://travissend-it.herokuapp.com/api/v1/parcels/${parcelId}/presentLocation`, { 
      method: 'PUT',
      headers,
      body: JSON.stringify({ presentLocation }),
     })
    .then(validateResponse)
    .then((data) => {
      const { success, parcel } = data;
      const element = el.parentNode.previousElementSibling.children[2];
      
      if (modal.children[0].classList.contains('alert-error')) {
        modal.children[0].classList.remove('alert-error');
      }

      modal.classList.add('active');
      modal.children[0].classList.add('alert-success');
      modal.children[0].children[1].innerHTML = success;
      element.children[1].innerHTML = parcel.present_location;
      element.children[2].value = parcel.present_location;
    })
    .catch((errors) => {
      if (modal.children[0].classList.contains('alert-success')) {
        modal.children[0].classList.remove('alert-success');
      }

      modal.classList.add('active');
      modal.children[0].classList.add('alert-error');
      modal.children[0].children[1].innerHTML = errors.error;
    });
  };

  // Function to cancel a specific Parcels
  const deliverParcel = (el, parcelId, status) => {
    fetch(`https://travissend-it.herokuapp.com/api/v1/parcels/${parcelId}/status`, { 
      method: 'PUT',
      headers,
      body: JSON.stringify({ status }),
     })
    .then(validateResponse)
    .then((data) => {
      const { success, parcel } = data;
      const element = el.parentNode.parentNode.parentNode;
      
      if (modal.children[0].classList.contains('alert-error')) {
        modal.children[0].classList.remove('alert-error');
      }

      modal.classList.add('active');
      modal.children[0].classList.add('alert-success');
      modal.children[0].children[1].innerHTML = success;
      element.children[1].children[1].innerHTML = parcel.status;
      element.children[4].children[0].className="not-allowed";
      element.children[4].children[0].removeAttribute('title');
      element.children[4].children[1].className="not-allowed";
      element.children[4].children[1].removeAttribute('title');
    })
    .catch((errors) => {
      if (modal.children[0].classList.contains('alert-success')) {
        modal.children[0].classList.remove('alert-success');
      }

      modal.classList.add('active');
      modal.children[0].classList.add('alert-error');
      modal.children[0].children[1].innerHTML = errors.error;
    });
  };

  // Administer eventlisteners to expand/destination of Accordions
  const accordionListeners = (mainBtns, otherBtns, txt, input, btn) => {
    // Function to removing active buttons in accordions
    const rmActiveAccordion = (btns) => {
      btns
        .filter((btn) => btn.classList.contains('active'))
        .forEach((btn) => { 
          btn.classList.remove('active')
          const openBox =  btn.parentNode.nextElementSibling;
          nodeDisplay(openBox, 'none');
        })
    };
    //Callback function for expanding and collapse
    const accordionCallback = (e) => {
      parcelInfo = e.target.parentNode.parentNode.nextElementSibling;
      parcelLocationTextNode = parcelInfo.children[1].children[2].children[1];
      parcelLocationInputNode = parcelInfo.children[1].children[2].children[2];
      editBtnNode = parcelInfo.children[2];
      if (parcelInfo.style.display !== 'flex') {
        rmActiveAccordion([...mainBtns, ...otherBtns]);
        e.target.parentNode.classList.add('active');
        nodeDisplay(parcelInfo, 'flex');
        nodeDisplay(parcelLocationTextNode, txt);
        nodeDisplay(parcelLocationInputNode, input);
        nodeDisplay(editBtnNode, btn);
      } else {
        rmActiveAccordion([...mainBtns, ...otherBtns]);
      }
    };
    // Remove Eventlisteners for already (if any) created buttons
    [...mainBtns].forEach((mainBtn) => {
      mainBtn.removeEventListener('click', accordionCallback);
    });
    // Add Eventlisteners to dynamically created buttons
    [...mainBtns].forEach((mainBtn) => {
      mainBtn.addEventListener('click', accordionCallback);
    });
  };

  const editBtnListeners = (editBtns) => {
    // Callback function for editing Parcel Destination
    const editCallback = (e) => {
      const node = e.target;
      parcelId = node.parentNode.parentNode.parentNode.children[0].children[2].innerHTML;
      presentLocationInputNode = node.parentNode.previousElementSibling.children[2].children[2].value;
      updateParcel(node, parcelId, presentLocationInputNode);
    };
    // Remove Eventlisteners for already (if any) created buttons
    [...editBtns].forEach((editBtn) => {
      editBtn.removeEventListener('click', editCallback);
    });
    // Add Eventlisteners to dynamically created buttons
    [...editBtns].forEach((editBtn) => {
      editBtn.addEventListener('click', editCallback);
    });
  };

  // Administer eventlisteners for Cancel Buttons in Accordions
  const deliverBtnListeners = (deliverBtns) => {
    // Callback function for editing Parcel Destination
    const deliverCallback = (e) => {
      const node = e.target;
      parcelId = node.parentNode.parentNode.parentNode.children[0].children[2].innerHTML;
      deliverParcel(node, parcelId, 'Delivered');
    };
    // Remove Eventlisteners for already (if any) created buttons
    [...deliverBtns].forEach((deliverBtn) => {
      deliverBtn.removeEventListener('click', deliverCallback);
    });
    // Add Eventlisteners to dynamically created buttons
    [...deliverBtns].forEach((deliverBtn) => {
      deliverBtn.addEventListener('click', deliverCallback);
    });
  };

  // Event listening for a click event on the 'Dasboard' button
  dashboardTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    dashboardTabBtn.classList.add('active');
    dashboardTab.classList.add('active');
  });

  // Event listening for a click event on the 'View All' button
  viewAllTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewAllTabBtn.classList.add('active');
    viewAllTab.classList.add('active');

    fetchParcels('all', 'view-all-success', 'view-all-error', viewAllBox);
  });

  // Event listening for a click event on the 'View Pending' button
  viewPendingTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewPendingTabBtn.classList.add('active');
    viewPendingTab.classList.add('active');

    fetchParcels('In Transit', 'view-pending-success', 'view-pending-error', viewPendingBox);
  });

  // Event listening for a click event on the 'View Delivered' button
  viewDeliveredTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewDeliveredTabBtn.classList.add('active');
    viewDeliveredTab.classList.add('active');

    fetchParcels('Delivered', 'view-delivered-success', 'view-delivered-error', viewDeliveredBox);
  });

  // Event listening for a click event on the 'Profile' button
  profileTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    profileTabBtn.classList.add('active');
    profileTab.classList.add('active');
  });

  // To edit Profile Tab
  editProfileBtn.addEventListener('click', () => {
    editProfileTab.classList.add('active');
    viewProfileTab.classList.remove('active');
  });

  // To view Profile Tab
  saveProfileBtn.addEventListener('click', () => {
    viewProfileTab.classList.add('active');
    editProfileTab.classList.remove('active');
  });
});
