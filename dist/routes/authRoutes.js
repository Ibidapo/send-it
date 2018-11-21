'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authValidation = require('../validation/authValidation');

var _authValidation2 = _interopRequireDefault(_authValidation);

var _userController = require('../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// POST request to register user
router.post('/signup', _authValidation2.default.registerUser, _userController2.default.registerUser);

// POST request to login user
router.post('/login', _authValidation2.default.loginUser, _userController2.default.loginUser);

module.exports = router;