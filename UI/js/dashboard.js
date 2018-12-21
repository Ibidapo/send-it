/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Profile input fields as variables
  const dashboardBox = document.getElementsByClassName('dashboard-box');
  const errorMsg = document.getElementById('dashboard-error');

  // Initialize Default variable for loccalStorage and endpoints
  const userId = localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('isAdmin');
  const userEndpoint = `https://travissend-it.herokuapp.com/api/v1/users/${userId}/parcels`;
  const adminEndpoint = 'https://travissend-it.herokuapp.com/api/v1/parcels/'

  // Functions to abstract Fetch API
  const getResult = (data) => {
    const { parcels } = data;
    const allParcels = parcels.length;
    const pendingParcels = parcels.filter((parcel) => parcel.status === 'In Transit').length;
    const cancelledParcels = parcels.filter((parcel) => parcel.status === 'Cancelled').length;
    const deliveredParcels = parcels.filter((parcel) => parcel.status === 'Delivered').length;

    dashboardBox[0].children[0].innerHTML = allParcels;
    dashboardBox[1].children[0].innerHTML = pendingParcels;
    dashboardBox[2].children[0].innerHTML = cancelledParcels;
    dashboardBox[3].children[0].innerHTML = deliveredParcels;
  }
  const getError = (errors) => {
    errorMsg.classList.add('active');
    if (errors.error === undefined) {
      errorMsg.innerHTML = 'Network connection error occurred';
      return;
    }
    errorMsg.innerHTML = errors.error;
  }
  const validateResponse = (response) => {
    return response.json()
      .then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return json
      })
  }
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  // Function to 
  const fetchParcelInfo = (url) => {
    fetch(url, { headers })
    .then(validateResponse)
    .then(getResult)
    .catch(getError);
  }

  if (isAdmin === 'true') {
    fetchParcelInfo(adminEndpoint);
  } else {
    fetchParcelInfo(userEndpoint);
  }
});
