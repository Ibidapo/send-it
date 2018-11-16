'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('express-validator/check');

var _user = require('../db/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Utility class controlling every request made for a user
var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'addUser',

    // method to add user
    value: function addUser(req, res) {
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }

      var newUser = req.body;

      _user2.default.push(newUser);
      return res.status(201).send({ success: 'User was successfully registered' });
    }

    // method to validate user by Id

  }, {
    key: 'validateUser',
    value: function validateUser(req, res) {
      var errors = (0, _check.validationResult)(req);
      if (!errors.isEmpty()) {
        return res.status(404).send({ error: errors.array() });
      }

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      var isUserValid = _user2.default.some(function (user) {
        var userEmail = user.email.toString();
        var userPass = user.password.toString();

        return userEmail === email.toString() && userPass === password.toString();
      });

      return isUserValid ? res.status(200).send({ success: 'User was successfully logged in' }) : res.status(401).send({ error: 'Username or Password is invalid' });
    }
  }]);

  return User;
}();

exports.default = User;