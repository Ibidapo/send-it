document.addEventListener('DOMContentLoaded', () => {
  // initialize Burger Button for mobile navbar
  const menuBtn = document.getElementById('menu');
  const tabList = document.getElementById('list');
  // Initialize all the parcel-box elements
  let viewParcelInfo = document.getElementsByClassName("view-parcel-info");
  let editParcelInfo = document.getElementsByClassName("edit-parcel-info");

  let nodeDisplay = (node, val) => {
    node.style.display = val;
  }

  let childNodeDisplay = (node, nodeIndex, val) => {
    node.childNodes[nodeIndex].style.display = val;
  };

  for (let i = 0; i < viewParcelInfo.length; i++) {
    viewParcelInfo[i].addEventListener("click", function() {
      parcelInfo = this.parentNode.nextElementSibling;
      parcelStateNode = parcelInfo.childNodes[17];
      newLocationNode = parcelInfo.childNodes[19];
      editBtnNode = parcelInfo.childNodes[23];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
        childNodeDisplay(this, 1, "block");
        childNodeDisplay(this, 3, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(this, 1, "none");
        childNodeDisplay(this, 3, "block");
        childNodeDisplay(parcelStateNode, 3, "inline");
        childNodeDisplay(parcelStateNode, 5, "none");
        nodeDisplay(newLocationNode, "none");
        nodeDisplay(editBtnNode, "none");
      }
    });
  }

  for (let i = 0; i < editParcelInfo.length; i++) {
    editParcelInfo[i].addEventListener("click", function() {
      parcelInfo = this.parentNode.nextElementSibling;
      parcelStateNode = parcelInfo.childNodes[17];
      newLocationNode = parcelInfo.childNodes[19];
      editBtnNode = parcelInfo.childNodes[23];
      if (parcelInfo.style.display === "flex") {
        nodeDisplay(parcelInfo, "none");
        childNodeDisplay(this.nextElementSibling, 1, "block");
        childNodeDisplay(this.nextElementSibling, 3, "none");
      } else {
        nodeDisplay(parcelInfo, "flex");
        childNodeDisplay(this.nextElementSibling, 1, "none");
        childNodeDisplay(this.nextElementSibling, 3, "block");
        childNodeDisplay(parcelStateNode, 3, "none");
        childNodeDisplay(parcelStateNode, 5, "inline");
        nodeDisplay(newLocationNode, "block");
        nodeDisplay(editBtnNode, "block");
        parcelStateNode.childNodes[5].value = parcelStateNode.childNodes[3].innerHTML;
      }
    });
  }

  menuBtn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      this.classList.remove('active'); 
      tabList.classList.remove('active'); 
    } else {
      this.classList.add('active');
      tabList.classList.add('active'); 
    }
  });
});