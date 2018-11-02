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
  let viewParcelInfo = document.getElementsByClassName("view-parcel-info");
  let editParcelInfo = document.getElementsByClassName("edit-parcel-info");
  let deleteParcelInfo = document.getElementsByClassName("delete-parcel-info");
  let parcelInfo, addressNode, editBtnNode;

  let nodeDisplay = (node, val) => {
    node.style.display = val;
  }

  let childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  for (let i = 0; i < viewParcelInfo.length; i++) {
    viewParcelInfo[i].addEventListener("click", function() {
      parcelInfo = this.parentNode.nextElementSibling;
      addressNode = parcelInfo.childNodes[15];
      editBtnNode = parcelInfo.childNodes[21];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
        childNodeDisplay(this, 1, "block");
        childNodeDisplay(this, 3, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(this, 1, "none");
        childNodeDisplay(this, 3, "block");
        childNodeDisplay(addressNode, 3, "inline");
        childNodeDisplay(addressNode, 5, "none");
        nodeDisplay(editBtnNode, "none");
      }
    });
  }

  for (let i = 0; i < editParcelInfo.length; i++) {
    editParcelInfo[i].addEventListener("click", function() {
      parcelInfo = this.parentNode.nextElementSibling;
      addressNode = parcelInfo.childNodes[15];
      editBtnNode = parcelInfo.childNodes[21];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
        childNodeDisplay(this.nextElementSibling, 1, "block");
        childNodeDisplay(this.nextElementSibling, 3, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(this.nextElementSibling, 1, "none");
        childNodeDisplay(this.nextElementSibling, 3, "block");
        childNodeDisplay(addressNode, 3, "none");
        childNodeDisplay(addressNode, 5, "inline");
        addressNode.childNodes[5].value = addressNode.childNodes[3].innerHTML;
        nodeDisplay(editBtnNode, "block");
      }
    });
  }

  for (let i = 0; i < deleteParcelInfo.length; i++) {
    deleteParcelInfo[i].addEventListener("click", function() {
      let outmostBox = this.parentNode.parentNode.parentNode
      outmostBox.parentNode.removeChild(outmostBox);
    });
  }

  // Function filters an array of html element with the active class, then removes the active class.
  const removeActiveClass = (arr) => {
    arr.filter((button) => button.classList.contains('active')).forEach((button) => button.classList.remove('active'));
  }

  menuBtn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.remove('active'); 
      tabList.classList.remove('active'); 
    } else {
      this.classList.add('active');
      tabList.classList.add('active'); 
    }
  })

  sendTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    sendTabBtn.classList.add('active');
    sendTab.classList.add('active');
  });

  viewAllTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewAllTabBtn.classList.add('active');
    viewAllTab.classList.add('active');
  });

  viewPendingTabBtn.addEventListener('click', () => {
    removeActiveClass(arrayTab);
    viewPendingTabBtn.classList.add('active');
    viewPendingTab.classList.add('active');
  });

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
});