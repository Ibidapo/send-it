'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcel = require('../db/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _parcelsFunc = require('./parcelsFunc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Get request to fetch a specific parcel
router.get('/parcels/:id', function (req, res) {
  var id = req.params.id;

  var findParcel = (0, _parcelsFunc.parcelbyId)(_parcel2.default, id);

  if (findParcel.length === 0) {
    res.status(404).send('Cannot fetch Parcel...');
  }

  res.send(findParcel[0]);
});

exports.default = router;