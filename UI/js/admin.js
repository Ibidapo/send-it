/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');
  // Initialize all the parcel-box elements
  const viewParcelInfo = document.getElementsByClassName('view-parcel-info');
  const editParcelInfo = document.getElementsByClassName('edit-parcel-info');

  const nodeDisplay = (node, val) => {
    node.style.display = val;
  };

  const childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  for (let i = 0; i < viewParcelInfo.length; i += 1) {
    viewParcelInfo[i].addEventListener('click', () => {
      viewParcelInfo[i].classList.toggle('active');
      parcelInfo = viewParcelInfo[i].parentNode.nextElementSibling;
      parcelStateNode = parcelInfo.childNodes[17];
      newLocationNode = parcelInfo.childNodes[19];
      editBtnNode = parcelInfo.childNodes[23];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(parcelStateNode, 3, "inline");
        childNodeDisplay(parcelStateNode, 5, "none");
        nodeDisplay(newLocationNode, "none");
        nodeDisplay(editBtnNode, "none");
      }
    });
  }

  for (let i = 0; i < editParcelInfo.length; i += 1) {
    editParcelInfo[i].addEventListener('click', () => {
      editParcelInfo[i].classList.toggle('active');
      parcelInfo = editParcelInfo[i].parentNode.nextElementSibling;
      parcelStateNode = parcelInfo.childNodes[17];
      newLocationNode = parcelInfo.childNodes[19];
      editBtnNode = parcelInfo.childNodes[23];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(parcelStateNode, 3, "none");
        childNodeDisplay(parcelStateNode, 5, "inline");
        nodeDisplay(newLocationNode, "block");
        nodeDisplay(editBtnNode, "block");
        parcelStateNode.childNodes[5].value = parcelStateNode.childNodes[3].innerHTML;
      }
    });
  }

  menuBtn.addEventListener('click', () => {
    if (menuBtn.classList.contains('active')) {
      menuBtn.classList.remove('active');
      tabList.classList.remove('active');
    } else {
      menuBtn.classList.add('active');
      tabList.classList.add('active');
    }
  });
});
