'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _addParcel = require('../controller/addParcel');

var _addParcel2 = _interopRequireDefault(_addParcel);

var _deleteParcel = require('../controller/deleteParcel');

var _deleteParcel2 = _interopRequireDefault(_deleteParcel);

var _getParcelbyId = require('../controller/getParcelbyId');

var _getParcelbyId2 = _interopRequireDefault(_getParcelbyId);

var _getParcelbyUser = require('../controller/getParcelbyUser');

var _getParcelbyUser2 = _interopRequireDefault(_getParcelbyUser);

var _getParcels = require('../controller/getParcels');

var _getParcels2 = _interopRequireDefault(_getParcels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/api/v1', _addParcel2.default);
router.use('/api/v1', _deleteParcel2.default);
router.use('/api/v1', _getParcelbyId2.default);
router.use('/api/v1', _getParcelbyUser2.default);
router.use('/api/v1', _getParcels2.default);

module.exports = router;