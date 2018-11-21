'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SendIT Server - Authentication Routes', function () {
  // Testing for registration of user
  describe('/POST Request to register user', function () {
    it('should return a status code of 201 and register user', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        email: 'funsho@example.com',
        password: 'orange'
      }).set('Accept', 'application/json').expect(400).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ error: 'An error occurred' });
      }).end(function (err, res) {
        var param = err || res;
        return param === err ? done(err) : done();
      });
    });
  });

  // Testing for user login
  describe('/POST Request to login user', function () {
    it('should return a status code of 201 and login user', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send({
        email: 'dapo@example.com',
        password: 'mango'
      }).set('Accept', 'application/json').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'User was successfully logged in' });
      }).end(function (err, res) {
        var param = err || res;
        return param === err ? done(err) : done();
      });
    });
  });
}); /* eslint-env mocha */