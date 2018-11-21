'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelController = require('../controller/parcelController');

var _parcelController2 = _interopRequireDefault(_parcelController);

var _parcelValidation = require('../validation/parcelValidation');

var _parcelValidation2 = _interopRequireDefault(_parcelValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Post request to add parcel order
router.post('/', _parcelValidation2.default.addParcel, _parcelController2.default.addParcel);

// Put request to cancel parcel order
router.put('/:id/cancel', _parcelValidation2.default.cancelParcel, _parcelController2.default.cancelParcel);

// Get request to retrieve a parcel order by Id
router.get('/:id', _parcelValidation2.default.getParcelbyId, _parcelController2.default.getParcelbyId);

// Get request to retrieve all parcel orders
router.get('/', _parcelController2.default.getParcels);

// Put request to change destination of a parcel order by Id
router.put('/:id/destination', _parcelValidation2.default.changeParcelDestination, _parcelController2.default.changeParcelDestination);

// Put request to change destination of a parcel order by Id
router.put('/:id/status', _parcelValidation2.default.changeParcelStatus, _parcelController2.default.changeParcelStatus);

// Put request to change destination of a parcel order by Id
router.put('/:id/presentLocation', _parcelValidation2.default.changeParcelPresentLocation, _parcelController2.default.changeParcelPresentLocation);

module.exports = router;