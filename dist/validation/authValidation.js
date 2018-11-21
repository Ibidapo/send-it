'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _check = require('express-validator/check');

var validation = {
  registerUser: [(0, _check.check)('firstName').optional(), (0, _check.check)('lastName').optional(), (0, _check.check)('email').isEmail().withMessage('Enter a valid email address'), (0, _check.check)('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')],
  loginUser: [(0, _check.check)('email').isEmail().withMessage('Enter a valid email address'), (0, _check.check)('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')],
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