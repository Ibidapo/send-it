'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('express-validator/check');

var _connection = require('../models/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Utility class controlling every request made for a user
var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'registerUser',

    // method to add user
    value: function registerUser(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;


      return _connection2.default.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], function (error, results) {
        if (error) {
          return res.status(400).send({ error: 'An error occurred' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'User was not registered' });
        }
        return res.status(201).send({ success: 'User was successfully registered' });
      });
    }

    // method to validate user by Id

  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      // Finds the validation errors in this request
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;


      return _connection2.default.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], function (error, results) {
        if (error) {
          return res.status(400).send({ error: 'An error occurred' });
        }
        var rowCount = results.rowCount;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Username or Password is invalid' });
        }
        return res.status(200).send({ success: 'User was successfully logged in' });
      });
    }
  }]);

  return User;
}();

exports.default = User;