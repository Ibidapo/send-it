/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');
  // initialize Tab Buttons into variables
  const sendTabBtn = document.getElementById('send-tab-btn');
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
  const viewParcelInfo = document.getElementsByClassName('view-parcel-info');
  const editParcelInfo = document.getElementsByClassName('edit-parcel-info');
  const deleteParcelInfo = document.getElementsByClassName('delete-parcel-info');
  let parcelInfo;
  let addressNode;
  let editBtnNode;

  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };

  const childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  for (let i = 0; i < viewParcelInfo.length; i += 1) {
    viewParcelInfo[i].addEventListener('click', () => {
      viewParcelInfo[i].classList.toggle('active')
      parcelInfo = viewParcelInfo[i].parentNode.nextElementSibling;
      addressNode = parcelInfo.childNodes[15];
      editBtnNode = parcelInfo.childNodes[21];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none"); 
        
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(addressNode, 3, "inline");
        childNodeDisplay(addressNode, 5, "none");
        nodeDisplay(editBtnNode, "none");
      }
    });
  }

  for (let i = 0; i < editParcelInfo.length; i += 1) {
    editParcelInfo[i].addEventListener('click', () => {
      parcelInfo = editParcelInfo[i].parentNode.nextElementSibling;
      addressNode = parcelInfo.childNodes[15];
      editBtnNode = parcelInfo.childNodes[21];
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
  }

  for (let i = 0; i < deleteParcelInfo.length; i += 1) {
    deleteParcelInfo[i].addEventListener('click', () => {
      const outmostBox = deleteParcelInfo[i].parentNode.parentNode.parentNode;
      outmostBox.parentNode.removeChild(outmostBox);
    });
  }

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

  profileTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    profileTabBtn.classList.add('active');
    profileTab.classList.add('active');
  });

  // Get quote modal
  const quoteModal = document.getElementById('quote-modal');

  // Get the button that opens the modal
  const quoteBtn = document.getElementById('get-quote-btn');

  // Get the <span> element that closes the modal
  const closeModalBtn = document.getElementById('close-modal');

  // When the user clicks on the button, open the modal
  quoteBtn.addEventListener('click', () => {
    quoteModal.style.display = 'block';
  });

  // When the user clicks on <span> (x), close the modal
  closeModalBtn.addEventListener('click', () => {
    quoteModal.style.display = 'none';
  });
});
