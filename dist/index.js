'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _parcelRoutes = require('./routes/parcelRoutes');

var _parcelRoutes2 = _interopRequireDefault(_parcelRoutes);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use('/api/v1/parcels', _parcelRoutes2.default);
app.use('/api/v1/users', _userRoutes2.default);

// Port server is running on for localhost and Heroku integration
app.listen(port);

exports.default = app;