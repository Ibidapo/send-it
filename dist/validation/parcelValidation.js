'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _check = require('express-validator/check');

var validation = {
  addParcel: [(0, _check.check)('fromAddress').isLength({ min: 1 }).withMessage('Sender Address cannot be empty'), (0, _check.check)('toAddress').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'), (0, _check.check)('parcelKg').matches('[0-9]+').withMessage('Parcel weight must be a number'), (0, _check.check)('toPhone').isLength({ min: 11 }).matches('[0-9]+').withMessage('Phone must be 11 digits'), (0, _check.check)('presentLocation').isLength({ min: 1 }).withMessage('Present Location cannot be empty')],
  cancelParcel: [(0, _check.check)('id').matches('[0-9]+').withMessage('Parcel Id must be a number')],
  getParcelbyId: [(0, _check.check)('id').matches('[0-9]+').withMessage('Parcel Id must be a number')],
  changeParcelDestination: [(0, _check.check)('id').matches('[0-9]+').withMessage('Parcel Id must be a number'), (0, _check.check)('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty')],
  changeParcelStatus: [(0, _check.check)('id').matches('[0-9]+').withMessage('Parcel Id must be a number'), (0, _check.check)('status').isIn(['In Transit', 'Delivered', 'Cancel']).withMessage('status is invalid')],
  changeParcelPresentLocation: [(0, _check.check)('id').matches('[0-9]+').withMessage('Parcel Id must be a number'), (0, _check.check)('presentLocation').isLength({ min: 1 }).withMessage('present location field cannot be empty')],
  errorFormatter: function errorFormatter(_ref) {
    var location = _ref.location,
        msg = _ref.msg,
        param = _ref.param,
        value = _ref.value,
        nestedErrors = _ref.nestedErrors;

    return {
      type: 'Error',
      location: location,
      message: msg,
      param: param,
      value: value,
      nestedErrors: nestedErrors
    };
  }
};

exports.default = validation;