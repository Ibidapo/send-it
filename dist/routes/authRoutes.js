'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _check = require('express-validator/check');

var _userController = require('../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', [(0, _check.check)('userId').optional(), (0, _check.check)('firstName').optional(), (0, _check.check)('lastName').optional(), (0, _check.check)('email').isEmail().withMessage('Enter a valid email address'), (0, _check.check)('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')], _userController2.default.addUser);

router.post('/login', [(0, _check.check)('email').isEmail().withMessage('Enter a valid email address'), (0, _check.check)('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')], _userController2.default.validateUser);

module.exports = router;