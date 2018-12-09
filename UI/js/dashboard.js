/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.replace('https://ibidapo.github.io/send-it/UI/');
  }

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

  // Initialize all the parcel-box elements
  const viewParcelBtns = document.getElementsByClassName('view-parcel-info');
  const editParcelBtns = document.getElementsByClassName('edit-parcel-info');
  let parcelInfo;
  let addressNode;
  let editBtnNode;

  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };

  const childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  const getChildNode = (node, nodeIndex) => node.childNodes[nodeIndex];

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

  // Function filters an array of html element with the active class, then removes the active class.
  const removeActiveClass = (arr) => {
    arr.filter(button => button.classList.contains('active')).forEach(button => button.classList.remove('active'));
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
  createOrderBtn.addEventListener('click', () => {
    confirmOrder.classList.add('active');
    createOrderForm.classList.remove('active');
  });

  // To confirm order
  confirmOrderBtn.addEventListener('click', () => {
    createOrderForm.classList.add('active');
    confirmOrder.classList.remove('active');
  });
});
