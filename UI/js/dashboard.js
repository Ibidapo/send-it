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

  // initialize Tab into variables
  const sendTab = document.getElementById('send-tab');
  const viewAllTab = document.getElementById('view-all-tab');
  const viewPendingTab = document.getElementById('view-pending-tab');
  const viewDeliveredTab = document.getElementById('view-delivered-tab');
  const profileTab = document.getElementById('profile-tab');
  const arrayTab = [sendTab, viewAllTab, viewPendingTab, viewDeliveredTab, profileTab,
    sendTabBtn, viewAllTabBtn, viewPendingTabBtn, viewDeliveredTabBtn, profileTabBtn];

  // Initialize all the parcel-box elements
  const viewParcelBtns = document.getElementsByClassName('view-parcel-info');
  const editParcelBtns = document.getElementsByClassName('edit-parcel-info');
  let parcelInfo;
  let addressNode;
  let editBtnNode;

  // Initialiaze all modal elements
  const quoteBtn = document.getElementById('get-quote-btn');
  const quoteModal = document.getElementById('quote-modal');
  const closeModalBtn = document.getElementById('close-modal');

  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };

  const childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  const getChildNode = (node, nodeIndex) => node.childNodes[nodeIndex];

  [...viewParcelBtns].forEach((viewParcelBtn) => {
    viewParcelBtn.addEventListener('click', () => {
      viewParcelBtn.classList.toggle('active');
      parcelInfo = viewParcelBtn.parentNode.nextElementSibling;
      addressNode = getChildNode(parcelInfo, 15);
      editBtnNode = getChildNode(parcelInfo, 21);
      if (parcelInfo.style.display === 'flex') {
        nodeDisplay(parcelInfo, 'none');
      } else {
        nodeDisplay(parcelInfo, 'flex');
        childNodeDisplay(addressNode, 3, 'inline');
        childNodeDisplay(addressNode, 5, 'none');
        nodeDisplay(editBtnNode, 'none');
      }
    });
  });

  [...editParcelBtns].forEach((editParcelBtn) => {
    editParcelBtn.addEventListener('click', () => {
      editParcelBtn.classList.toggle('active');
      parcelInfo = editParcelBtn.parentNode.nextElementSibling;
      addressNode = getChildNode(parcelInfo, 15);
      editBtnNode = getChildNode(parcelInfo, 21);
      if (parcelInfo.style.display === 'flex') {
        nodeDisplay(parcelInfo, 'none');
      } else {
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

  // When the user clicks on the button, open the modal
  quoteBtn.addEventListener('click', () => {
    quoteModal.style.display = 'block';
  });

  // Event listening for a click on the close symbol on modal
  closeModalBtn.addEventListener('click', () => {
    quoteModal.style.display = 'none';
  });
});
