'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcelController = require('../controller/parcelController');

var _parcelController2 = _interopRequireDefault(_parcelController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:id/parcels', _parcelController2.default.getParcelbyUser);

module.exports = router;