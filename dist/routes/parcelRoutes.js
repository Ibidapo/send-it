'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _check = require('express-validator/check');

var _parcelController = require('../controller/parcelController');

var _parcelController2 = _interopRequireDefault(_parcelController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Post request to add parcel order
router.post('/', [(0, _check.check)('parcelId').isLength({ min: 6 }).matches('[0 - 9]').withMessage('Parcel ID is invalid'), (0, _check.check)('userId').isLength({ min: 6 }).matches('[0 - 9]').withMessage('User ID invalid'), (0, _check.check)('from').custom(function (value) {
  if (value.address === '' || value.weight === '') {
    return false;
  }
  return value;
}).withMessage('Address or Weight cannot be empty'), (0, _check.check)('to').custom(function (value) {
  if (value.address === '' || value.phone === '') {
    return false;
  }
  return value;
}).withMessage('Address or Phone cannot be empty'), (0, _check.check)('status').optional(), (0, _check.check)('presentLocation').isLength({ min: 1 }).withMessage('Present Location field cannot be empty')], _parcelController2.default.addParcel);

// Put request to cancel parcel order
router.put('/:id/cancel', _parcelController2.default.cancelParcel);

// Get request to retrieve a parcel order by Id
router.get('/:id', _parcelController2.default.getParcelbyId);

// Get request to retrieve all parcel orders
router.get('/', _parcelController2.default.getParcels);

// Put request to change destination of a parcel order by Id
router.put('/:id/destination', [(0, _check.check)('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty')], _parcelController2.default.changeParcelDestination);

// Put request to change destination of a parcel order by Id
router.put('/:id/status', [(0, _check.check)('status').isLength({ min: 1 }).withMessage('status field cannot be empty')], _parcelController2.default.changeParcelStatus);

// Put request to change destination of a parcel order by Id
router.put('/:id/presentLocation', [(0, _check.check)('presentLocation').isLength({ min: 1 }).withMessage('present location field cannot be empty')], _parcelController2.default.changeParcelPresentLocation);

module.exports = router;