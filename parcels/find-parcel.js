let parcelModule = require('./parcel');
let parcels = parcelModule.parcels;

const findParcel = (reqParam) => parcels.filter((parcel) =>  parcel.parcelId == reqParam);

const findParcelByUser = (reqParam) => parcels.filter((parcel) => parcel.userId == reqParam);

module.exports = { findParcel, findParcelByUser };