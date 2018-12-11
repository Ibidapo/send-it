/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');

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
  const editProfile = document.getElementById('profile-form');
  const viewProfile = document.getElementById('profile-view');
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

  // Initialize all the parcel-box elements
  const viewParcelBtns = document.getElementsByClassName('view-parcel-info');
  const editParcelBtns = document.getElementsByClassName('edit-parcel-info');
  let parcelInfo;
  let addressNode;
  let editBtnNode;

  // Functions for toggling Display
  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };
  const childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };
  const getChildNode = (node, nodeIndex) => node.childNodes[nodeIndex];

  // Function filters an array of html element with the active class, then removes the active class.
  const removeActiveClass = (arr) => {
    arr.filter(button => button.classList.contains('active')).forEach(button => button.classList.remove('active'));
  };

  // Functions to abstract Fetch API
  // const redirectUser = (result) => {
  //   const { token } = result
  //   localStorage.setItem('token', token);
  //   window.location.replace('https://ibidapo.github.io/send-it/UI/user.html');
  // }
  // const displayError = (errors) => {
  //   const errorDiv = document.getElementById('error');
  //   errorDiv.classList.add('active');
  //   errorDiv.innerHTML = errors.error;
  // }
  const validateResponse = (response) => {
    return response.json()
      .then((json) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
  }
  // const fetchJSON = (pathToResource, user, pass) => {
  //   fetch(pathToResource, {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}` 
  //     },
  //     body: JSON.stringify({
  //       email: user, password: pass }),
  //   })
  //   .then(validateResponse)
  //   .then(redirectUser)
  //   .catch(displayError);
  // }

  [...viewParcelBtns].forEach((viewParcelBtn) => {
    viewParcelBtn.addEventListener('click', () => {
      parcelInfo = viewParcelBtn.parentNode.nextElementSibling;
      addressNode = getChildNode(parcelInfo, 15);
      editBtnNode = getChildNode(parcelInfo, 21);
      if (parcelInfo.style.display === 'flex') {
        [...viewParcelBtns, ...editParcelBtns].forEach((otherBtn) => {
          otherBtn.classList.remove('active');
          const otherParcelInfo = otherBtn.parentNode.nextElementSibling;
          nodeDisplay(otherParcelInfo, 'none');
        });
      } else {
        [...viewParcelBtns, ...editParcelBtns].forEach((otherBtn) => {
          otherBtn.classList.remove('active');
          const otherParcelInfo = otherBtn.parentNode.nextElementSibling;
          nodeDisplay(otherParcelInfo, 'none');
        });
        viewParcelBtn.classList.add('active');
        nodeDisplay(parcelInfo, 'flex');
        childNodeDisplay(addressNode, 3, 'inline');
        childNodeDisplay(addressNode, 5, 'none');
        nodeDisplay(editBtnNode, 'none');
      }
    });
  });

  [...editParcelBtns].forEach((editParcelBtn) => {
    editParcelBtn.addEventListener('click', () => {
      parcelInfo = editParcelBtn.parentNode.nextElementSibling;
      addressNode = getChildNode(parcelInfo, 15);
      editBtnNode = getChildNode(parcelInfo, 21);
      if (parcelInfo.style.display === 'flex') {
        [...viewParcelBtns, ...editParcelBtns].forEach((otherBtn) => {
          otherBtn.classList.remove('active');
          const otherParcelInfo = otherBtn.parentNode.nextElementSibling;
          nodeDisplay(otherParcelInfo, 'none');
        });
      } else {
        [...viewParcelBtns, ...editParcelBtns].forEach((otherBtn) => {
          otherBtn.classList.remove('active');
          const otherParcelInfo = otherBtn.parentNode.nextElementSibling;
          nodeDisplay(otherParcelInfo, 'none');
        });
        editParcelBtn.classList.add('active');
        nodeDisplay(parcelInfo, 'flex');
        childNodeDisplay(addressNode, 3, 'none');
        childNodeDisplay(addressNode, 5, 'inline');
        addressNode.childNodes[5].value = addressNode.childNodes[3].innerHTML;
        nodeDisplay(editBtnNode, 'block');
      }
    });
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
  });

  // Event listening for a click event on the View Pending Tab
  viewPendingTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewPendingTabBtn.classList.add('active');
    viewPendingTab.classList.add('active');
  });

  // Event listening for a click event on the View Delivered Tab
  viewDeliveredTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewDeliveredTabBtn.classList.add('active');
    viewDeliveredTab.classList.add('active');
  });

  // Event listening for a click event on the Profile Tab
  profileTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    profileTabBtn.classList.add('active');
    profileTab.classList.add('active');
  });

  // To edit Profile Tab
  editProfileBtn.addEventListener('click', () => {
    editProfile.classList.add('active');
    viewProfile.classList.remove('active');
  });

  // To view Profile Tab
  saveProfileBtn.addEventListener('click', () => {
    viewProfile.classList.add('active');
    editProfile.classList.remove('active');
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
    const errorDiv = document.getElementById('confirm-error');

    fetch('https://travissend-it.herokuapp.com/api/v1/parcels/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        origin: origin.innerHTML, 
        destination: destination.innerHTML,
        parcelKg: weight.innerHTML,
        toPhone: phone.innerHTML,
      }),
    })
    .then(validateResponse)
    .then((data) => {
      console.log(data);
      confirmOrder.classList.add('active');
      createOrderForm.classList.remove('active');
    })
    .catch((errors) => {
      const errorDiv = document.getElementById('send-error');
      errorDiv.classList.add('active');
      errorDiv.innerHTML = errors.error;
    });
  });
});
