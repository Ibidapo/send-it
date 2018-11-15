'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _parcel = require('../db/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Testing for SendIT Server
/* eslint-env mocha */

describe('SendIT Server', function () {
  // Testing for GET all parcels
  describe('Request to get all parcels', function () {
    it('should return a status code of 200 and all parcels', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/parcels').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual(_parcel2.default);
      }).end(done);
    });
  });
  // Testing for GET parcel by Id
  describe('Request to get parcel by Id', function () {
    it('should return a status code of 200 and a parcel', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/parcels/100001').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual(_parcel2.default[0]);
      }).end(done);
    });
  });
  // Testing for GET parcel by User
  describe('Request to get parcel by User', function () {
    it('should return a status code of 200 and a parcel', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/users/900000/parcels').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toContainEqual(_parcel2.default[0]);
      }).end(done);
    });
  });
  // Testing for POST parcel
  describe('Request to add parcel', function () {
    it('should return a status code of 200 and add parcel', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/parcels/').send({
        parcelId: 100004,
        userId: 900000,
        from: {
          address: 'Surulere, Lagos.',
          weight: 16
        },
        to: {
          address: 'Maryland, Lagos.',
          phone: '08011111111'
        },
        presentLocation: 'Ikorodu Road, Lagos.'
      }).set('Accept', 'application/json').expect(201).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Order was successfully created' });
      }).end(function (err, res) {
        var param = err || res;
        return param === err ? done(err) : done();
      });
    });
  });
  // Testing for PUT parcel
  describe('Request to delete parcel', function () {
    it('should return a status code of 200 and delete parcel', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/100001/cancel').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Order was successfully deleted' });
      }).end(done);
    });
  });
});