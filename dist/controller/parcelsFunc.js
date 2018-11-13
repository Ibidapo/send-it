"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parcelbyId = function parcelbyId(db, id) {
  return db.filter(function (parcel) {
    var parcelId = parcel.parcelId;

    return parcelId.toString() === id.toString();
  });
};

var parcelbyUser = function parcelbyUser(db, id) {
  return db.filter(function (parcel) {
    var userId = parcel.userId;

    return userId.toString() === id.toString();
  });
};

exports.parcelbyId = parcelbyId;
exports.parcelbyUser = parcelbyUser;