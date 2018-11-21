'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-param-reassign: ["error", { "props": false }] */

var _check = require('express-validator/check');

var _connection = require('../models/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Utility class controlling every request made for a parcel
var Parcel = function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, null, [{
    key: 'addParcel',

    // method to add parcel order
    value: function addParcel(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var _req$body = req.body,
          fromAddress = _req$body.fromAddress,
          parcelKg = _req$body.parcelKg,
          toAddress = _req$body.toAddress,
          toPhone = _req$body.toPhone,
          presentLocation = _req$body.presentLocation;

      var status = 'In Transit';
      var senderId = 1;

      return _connection2.default.query('INSERT INTO parcels (parcel_kg, sender_address, recipient_address, status, present_location, recipient_phone, sender_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [parcelKg, fromAddress, toAddress, status, presentLocation, toPhone, senderId], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'An error occured' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order was not created' });
        }
        return res.status(201).send({ success: 'Order was successfully created' });
      });
    }

    // method to cancel parcel order by Id

  }, {
    key: 'cancelParcel',
    value: function cancelParcel(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      var id = req.params.id;

      var status = 'Canceled';
      var delivered = 'Delivered';

      return _connection2.default.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3', [status, id, delivered], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'An error occured' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and cannot be updated' });
        }
        return res.status(200).send({ success: 'Order was canceled successfully' });
      });
    }

    // method to get all parcel orders

  }, {
    key: 'getParcels',
    value: function getParcels(req, res) {
      _connection2.default.query('SELECT * FROM parcels', function (error, results) {
        if (error) {
          return res.status(400).send({ error: 'An error occured' });
        }
        var rows = results.rows;

        return rows.length > 0 ? res.status(200).send(rows) : res.status(200).send({ success: 'You have made no orders' });
      });
    }

    // method to get parcel order by Id

  }, {
    key: 'getParcelbyId',
    value: function getParcelbyId(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var id = req.params.id;


      return _connection2.default.query('SELECT * FROM parcels WHERE parcel_id = $1', [id], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'Order was not found' });
        }
        var rows = results.rows;

        return res.status(200).send({ success: 'Order was successfully retrieved', rows: rows });
      });
    }

    // method to get parcel order by User ID

  }, {
    key: 'getParcelbyUser',
    value: function getParcelbyUser(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var id = req.params.id;


      return _connection2.default.query('SELECT * FROM parcels WHERE sender_id = $1', [id], function (error, results) {
        if (error) {
          return res.status(400).send({ error: 'An error occured' });
        }
        var rows = results.rows;

        return res.status(200).send(rows);
      });
    }

    // method to change destination of a parcel order by Id

  }, {
    key: 'changeParcelDestination',
    value: function changeParcelDestination(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var id = req.params.id;
      var destination = req.body.destination;

      var delivered = 'Delivered';

      return _connection2.default.query('UPDATE parcels SET recipient_address = $1 WHERE parcel_id = $2 AND status <> $3', [destination, id, delivered], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'Parcel was not found' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ success: 'Order destination was updated successfully' });
      });
    }

    // method to change present location of a parcel order by Id

  }, {
    key: 'changeParcelPresentLocation',
    value: function changeParcelPresentLocation(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var id = req.params.id;
      var presentLocation = req.body.presentLocation;

      var delivered = 'Delivered';

      return _connection2.default.query('UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 AND status <> $3', [presentLocation, id, delivered], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'Parcel was not found' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ success: 'Order present location was updated successfully' });
      });
    }

    // method to change status of a parcel order by Id

  }, {
    key: 'changeParcelStatus',
    value: function changeParcelStatus(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var id = req.params.id;
      var status = req.body.status;

      var delivered = 'Delivered';

      return _connection2.default.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3', [status, id, delivered], function (error, results) {
        if (error) {
          return res.status(400).send({ error: error, errorMsg: 'An error occurred' });
        }
        if (results.rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ error: 'Order status was updated successfully' });
      });
    }
  }]);

  return Parcel;
}();

exports.default = Parcel;