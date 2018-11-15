'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('express-validator/check');

var _parcel = require('../db/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Utility class controlling every request made for a parcel
var Parcel = function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, null, [{
    key: 'addParcel',

    // method to add Parcel
    value: function addParcel(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(404).send({ error: errors.array() });
      }

      var newParcel = req.body;

      _parcel2.default.push(newParcel);
      return res.status(201).send({ success: 'Order was successfully created' });
    }

    // method to delete parcel by Id

  }, {
    key: 'deleteParcel',
    value: function deleteParcel(req, res) {
      var id = req.params.id;


      var foundParcel = _parcel2.default.filter(function (parcel) {
        var parcelId = parcel.parcelId;

        return parcelId.toString() === id.toString();
      });

      if (foundParcel.length === 0) {
        res.status(404).send({ error: 'Cannot fetch Parcel' });
      }

      _parcel2.default.splice(_parcel2.default.indexOf(foundParcel[0]), 1);
      res.status(200).send({ success: 'Order was successfully deleted' });
    }

    // method to get parcel by Id

  }, {
    key: 'getParcelbyId',
    value: function getParcelbyId(req, res) {
      var id = req.params.id;


      var findParcel = _parcel2.default.filter(function (parcel) {
        var parcelId = parcel.parcelId;

        return parcelId.toString() === id.toString();
      });

      if (findParcel.length === 0) {
        res.status(404).send('Cannot fetch Parcel...');
      }

      res.status(200).send(findParcel[0]);
    }

    // method to get parcel by User ID

  }, {
    key: 'getParcelbyUser',
    value: function getParcelbyUser(req, res) {
      var id = req.params.id;


      var foundParcels = _parcel2.default.filter(function (parcel) {
        var userId = parcel.userId;

        return userId.toString() === id.toString();
      });

      if (foundParcels.length === 0) {
        res.status(404).send('Cannot fetch Parcel...');
      }

      res.status(200).send(foundParcels);
    }

    // method to get all parcels

  }, {
    key: 'getParcels',
    value: function getParcels(req, res) {
      // Check if parcel datastructure is empty
      if (_parcel2.default.length === 0) {
        res.status(404).send({ error: 'You have no orders' });
      }

      res.status(200).send(_parcel2.default);
    }
  }]);

  return Parcel;
}();

exports.default = Parcel;