'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelController = require('../controller/parcelController');

var _parcelController2 = _interopRequireDefault(_parcelController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _parcelController2.default.addParcel);
router.put('/:id/cancel', _parcelController2.default.deleteParcel);
router.get('/:id', _parcelController2.default.getParcelbyId);
router.get('/', _parcelController2.default.getParcels);

module.exports = router;