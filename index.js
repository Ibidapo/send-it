// require("babel-core").transform("code", options);
let express = require('express');
let mocha = require('mocha');
let bodyParser = require('body-parser');
let userModule = require('./users/user');
let parcelModule = require('./parcels/parcel');
let findParcelModule = require('./parcels/find-parcel');

let app = express();
let users = userModule.users;
let parcels = parcelModule.parcels;
// let findParcel = findParcelModule.findParcel;
// let findParcelByUser = findParcelModule.findParcelByUser;
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Get request to fetch all the parcels
app.get('/v1/parcels', (req, res) => {
  res.send(parcels);
});

// Get request to fetch a specific parcel
app.get('/v1/parcels/:id', (req, res) => {
  let { id } = req.params;

  // findParcel = findParcel(id);
  findParcel = parcels.filter((parcel) =>  parcel.parcelId == id);

  if(findParcel.length === 0) {
    res.status(404).send('Cannot fetch Parcel...')
  }

  res.send(findParcel[0]);
});

// Get request to fetch all parcels by a User 
app.get('/v1/users/:id/parcels', (req, res) => {
  let { id } = req.params;

  // findParcels = findParcelByUser(id);
  findParcels = parcels.filter((parcel) => parcel.userId == id);

  if(findParcels.length === 0) {
    res.status(404).send('Cannot fetch Parcel...')
  }

  res.send(findParcels);
});

// Put request to cancel a specific order
app.put('/v1/parcels/:id/cancel', (req, res) => {
   let { id } = req.params;

  // findParcel = findParcel(id);
  findParcel = parcels.filter((parcel) =>  parcel.parcelId == id);

  if(findParcel.length === 0) {
    res.status(404).send('Cannot fetch Parcel...');
  }

  parcels.splice(parcels.indexOf(findParcel[0]), 1);  

  res.send(parcels);
});

// Post request for a parcel
app.post('/v1/parcels', (req, res) => {
  let newParcel = req.body;
  parcels.push(newParcel);

  res.send(parcels);
});

// Port server is running on for localhost and Heroku integration
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});