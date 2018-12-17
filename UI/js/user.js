/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Tab Buttons into variables
  const sendTabBtn = document.getElementById('send-tab-btn');
  const sendTabBtn2 = document.getElementById('send-tab-btn-2');
  const viewAllTabBtn = document.getElementById('view-all-tab-btn');
  const viewPendingTabBtn = document.getElementById('view-pending-tab-btn');
  const viewDeliveredTabBtn = document.getElementById('view-delivered-tab-btn');
  const profileTabBtn = document.getElementById('profile-tab-btn');
  const editProfileBtn = document.getElementById('edit-profile');
  const saveProfileBtn = document.getElementById('save-profile');
  const createOrderBtn = document.getElementById('create-order-btn');
  const confirmOrderBtn = document.getElementById('confirm-order-btn');

  // initialize Tab into variables
  const sendTab = document.getElementById('send-tab');
  const viewAllTab = document.getElementById('view-all-tab');
  const viewPendingTab = document.getElementById('view-pending-tab');
  const viewDeliveredTab = document.getElementById('view-delivered-tab');
  const profileTab = document.getElementById('profile-tab');
  const editProfileTab = document.getElementById('profile-form');
  const viewProfileTab = document.getElementById('profile-view');
  const createOrderForm = document.getElementById('create-order-form');
  const confirmOrder = document.getElementById('confirm-order');
  const arrayTab = [sendTab, viewAllTab, viewPendingTab, viewDeliveredTab, profileTab,
    sendTabBtn, viewAllTabBtn, viewPendingTabBtn, viewDeliveredTabBtn, profileTabBtn];
    
  // initialize Confirm Order Input fields as variables;
  const origin = document.getElementById('origin');
  const destination = document.getElementById('destination');
  const weight = document.getElementById('weight');
  const phone = document.getElementById('phone');
  const distance = document.getElementById('distance');
  const quote = document.getElementById('quote');

  // Initialize containers for dynamically generated parcel box
  const viewAllBox = document.getElementById('view-all-box');
  const viewPendingBox = document.getElementById('view-pending-box');
  const viewDeliveredBox = document.getElementById('view-delivered-box');

  // Initialize all the parcel-box elements
  let parcelInfo;
  let parcelId
  let addressTextNode;
  let addressInputNode;
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
        <a title="Click to cancel" class="red cancel-parcel"><i class="fas fa-times"></i></a>
        <a title="Click to edit" class="blue edit-parcel-info"><i class="fas fa-pencil-alt"></i></a>`;
    }
    return `
    <a class="not-allowed"><i class="fas fa-times"></i></a>
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
      <div class="w-100 parcel-info d-flex my-1 mx-auto text-left">
        <div class="w-50">
          <div class="w-100"><h4 class="my-05 mb-0">From</h4></div>
          <div class="w-100 mt-05"><span>Address:</span> <b>${parcel.sender_address}</b></div>
          <div class="w-90 mt-05"><span>Weight</span> <b>${parcel.parcel_kg}kg</b></div>
        </div>
        <div class="w-50">
          <div class="w-100"><h4 class="my-05 mb-0">To</h4></div>
          <div class="w-100 mt-05">
            <span>Address:</span> <b class="address-tag">${parcel.recipient_address}</b>
            <input type="text" value="${parcel.recipient_address}">
          </div>
          <div class="w-100 mt-05"><span>Present Location:</span> <b>${parcel.present_location}</b></div>
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
      const editParcelBtns = document.getElementsByClassName('edit-parcel-button');
      
      addAccordionListeners(viewExpandBtns, editExpandBtns, 'inline', 'none', 'none');
      addAccordionListeners(editExpandBtns, viewExpandBtns, 'none', 'inline', 'block');
      editBtnListeners(editParcelBtns);
    })
    .catch((errors) => {
      const errorMsg = document.getElementById(errorId);
      errorMsg.classList.add('active');
      errorMsg.innerHTML = errors.error;
    });
  };

  // Function to fetch Parcels
  const updatefetchParcel = (el, parcelId, destination) => {
    fetch(`https://travissend-it.herokuapp.com/api/v1/parcels/${parcelId}/destination`, { 
      method: 'PUT',
      headers,
      body: JSON.stringify({ destination }),
     })
    .then(validateResponse)
    .then((data) => {
      const { success, parcel } = data;
      const element = el.parentNode.previousElementSibling.children[1];
      console.log(element)
      modal.classList.add('active');
      modal.children[0].classList.add('alert-success');
      modal.children[0].children[1].innerHTML = success;
      element.children[1].innerHTML = parcel.recipient_address;
      element.children[2].value = parcel.recipient_address;
    })
    .catch((errors) => {
      modal.classList.add('active');
      modal.children[0].classList.add('alert-error');
      modal.children[0].children[1].innerHTML = errors.error;
    });
  };

  // Administer eventlisteners to expand/destination of Accordions
  const addAccordionListeners = (mainBtns, otherBtns, txt, input, btn) => {
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
      addressTextNode = parcelInfo.children[1].children[1].children[1];
      addressInputNode = parcelInfo.children[1].children[1].children[2];
      editBtnNode = parcelInfo.children[2];
      if (parcelInfo.style.display !== 'flex') {
        rmActiveAccordion([...mainBtns, ...otherBtns]);
        e.target.parentNode.classList.add('active');
        nodeDisplay(parcelInfo, 'flex');
        nodeDisplay(addressTextNode, txt);
        nodeDisplay(addressInputNode, input);
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

  // Administer eventlisteners for Edit Buttons in Accordions
  const editBtnListeners = (editBtns) => {
    // Callback function for editing Parcel Destination
    const editCallback = (e) => {
      const node = e.target;
      parcelId = node.parentNode.parentNode.parentNode.children[0].children[2].innerHTML;
      addressInputNode = node.parentNode.previousElementSibling.children[1].children[2].value;
      updatefetchParcel(node, parcelId, addressInputNode);
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

  // Event listening for a click event on the Create Tab
  sendTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    sendTabBtn.classList.add('active');
    sendTab.classList.add('active');
  });

  // Event listening for a click event on the + button
  sendTabBtn2.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    sendTabBtn.classList.add('active');
    sendTab.classList.add('active');
  });

  // Event listening for a click event on the View All Tab
  viewAllTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewAllTabBtn.classList.add('active');
    viewAllTab.classList.add('active');

    fetchParcels('all', 'view-all-success', 'view-all-error', viewAllBox);
  });

  // Event listening for a click event on the View Pending Tab
  viewPendingTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewPendingTabBtn.classList.add('active');
    viewPendingTab.classList.add('active');

    fetchParcels('In Transit', 'view-pending-success', 'view-pending-error', viewPendingBox);
  });

  // Event listening for a click event on the View Delivered Tab
  viewDeliveredTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewDeliveredTabBtn.classList.add('active');
    viewDeliveredTab.classList.add('active');

    fetchParcels('Delivered', 'view-delivered-success', 'view-delivered-error', viewDeliveredBox);
  });

  // Event listening for a click event on the Profile Tab
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

  // To create order
  createOrderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const fromAddress = document.getElementById('from-address').value;
    const toAddress = document.getElementById('to-address').value;
    const parcelKg = document.getElementById('parcel-kg').value;
    const toPhone = document.getElementById('to-phone').value;
    let errorDiv = document.getElementById('send-error');
    const phoneRegex = /^\d{11}$/;
    const weightRegex = /^\d+\.?\d*$/;
    let distanceVal;
    
    if (fromAddress === '' ||  toAddress === '') {
      errorDiv.classList.add('active');
      errorDiv.innerHTML = 'Origin or Destination address cannot be empty';
      return;
    }

    if (!phoneRegex.test(toPhone)) {
      errorDiv.classList.add('active');
      errorDiv.innerHTML = 'Phone number must be 11 digits';
      return;
    }

    if (!weightRegex.test(parcelKg)) {
      errorDiv.classList.add('active');
      errorDiv.innerHTML = 'Parcel weight must be a number';
      return;
    }

    origin.innerHTML = fromAddress;
    destination.innerHTML = toAddress;
    weight.innerHTML = parcelKg;
    phone.innerHTML = toPhone;

    let map;
    let marker;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
      });

      var geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map, fromAddress, toAddress);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [fromAddress],
        destinations: [toAddress],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status == 'OK') {
          var results = response.rows[0].elements[0];
          distanceVal = results.distance.value;
          distance.innerHTML = results.distance.text;
          quote.innerHTML = ((distanceVal / 1000) * 70) + (parcelKg * 20);
         }
      });
    }

    function geocodeAddress(geocoder, resultsMap, from, to) {
      const locations = [from, to];

      locations.forEach((location) => {
        geocoder.geocode({ address: location }, (results, status) => {
          let markerTitle = 'Destination';
          if (status === 'OK') {
            if (locations.indexOf(location) === 0) {
              resultsMap.setCenter(results[0].geometry.location);
              markerTitle = 'Origin';
            }
            marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: markerTitle,
            });
          } else {
            console.log(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      });
    }

    google.maps.event.addDomListener(window, 'load', initMap());

    createOrderForm.classList.remove('active');
    confirmOrder.classList.add('active');
  });

  // To confirm order
  confirmOrderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const errorMsg = document.getElementById('confirm-error');
    const successMsg = document.getElementById('confirm-success');

    fetch('https://travissend-it.herokuapp.com/api/v1/parcels/', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        origin: origin.innerHTML, 
        destination: destination.innerHTML,
        parcelKg: weight.innerHTML,
        toPhone: phone.innerHTML,
      }),
    })
    .then(validateResponse)
    .then((data) => {
      confirmOrderBtn.disabled = true;
      successMsg.classList.add('active');
      successMsg.innerHTML = data.success;
    })
    .catch((errors) => {
      errorMsg.classList.add('active');
      errorMsg.innerHTML = errors.error;
    });
  });
});
