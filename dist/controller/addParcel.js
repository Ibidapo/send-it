'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcel = require('../db/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Post request for a parcel
router.post('/parcels', function (req, res) {
  var newParcel = req.body;
  _parcel2.default.push(newParcel);

  res.send(_parcel2.default);
});

exports.default = router;