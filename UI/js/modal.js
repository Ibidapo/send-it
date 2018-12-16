// Get the modal
const modal = document.getElementById('modal');

// Get the <span> element that closes the modal
var closeModal = document.getElementById('modal-close');

// When the user clicks on <span> (x), close the modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});