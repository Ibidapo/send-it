/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');
  // Initialize all the parcel-box elements
  const viewParcelBtns = document.getElementsByClassName('view-parcel-info');
  const editParcelBtns = document.getElementsByClassName('edit-parcel-info');
  let parcelInfo;
  let parcelStateNode;
  let newLocationNode;
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
      parcelStateNode = getChildNode(parcelInfo, 17);
      newLocationNode = getChildNode(parcelInfo, 19);
      editBtnNode = getChildNode(parcelInfo, 23);
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
        childNodeDisplay(parcelStateNode, 3, 'inline');
        childNodeDisplay(parcelStateNode, 5, 'none');
        nodeDisplay(newLocationNode, 'none');
        nodeDisplay(editBtnNode, 'none');
      }
    });
  });

  [...editParcelBtns].forEach((editParcelBtn) => {
    editParcelBtn.addEventListener('click', () => {
      parcelInfo = editParcelBtn.parentNode.nextElementSibling;
      parcelStateNode = getChildNode(parcelInfo, 17);
      newLocationNode = getChildNode(parcelInfo, 19);
      editBtnNode = getChildNode(parcelInfo, 23);
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
        childNodeDisplay(parcelStateNode, 3, 'none');
        childNodeDisplay(parcelStateNode, 5, 'inline');
        nodeDisplay(newLocationNode, 'block');
        nodeDisplay(editBtnNode, 'block');
        parcelStateNode.childNodes[5].value = parcelStateNode.childNodes[3].innerHTML;
      }
    });
  });

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
