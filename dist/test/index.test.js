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
  describe('/GET Request to retrieve a parcel order by Parcel Id', function () {
    it('should return a status code of 200 and retrieve a parcel order', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/parcels/100001').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual(_parcel2.default[0]);
      }).end(done);
    });
  });

  // Testing for GET parcel by User
  describe('/GET Request to retrieve a parcel order by User ID', function () {
    it('should return a status code of 200 and retrieve a parcel order', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/users/900000/parcels').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toContainEqual(_parcel2.default[0]);
      }).end(done);
    });
  });

  // Testing for POST parcel
  describe('/POST Request to add parcel order', function () {
    it('should return a status code of 201 and add parcel order', function (done) {
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

  // Testing for cancellation of parcel order
  describe('/PUT Request to cancel parcel order', function () {
    it('should return a status code of 200 and delete parcel', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/100001/cancel').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Order was successfully canceled' });
      }).end(done);
    });
  });

  // Testing for registration of user
  describe('/POST Request to register user', function () {
    it('should return a status code of 201 and register user', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        userId: '',
        email: 'funsho@example.com',
        firstName: '',
        lastName: '',
        password: 'orange'
      }).set('Accept', 'application/json').expect(201).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'User was successfully registered' });
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

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', function () {
    it('should return a status code of 200 and change parcel order destination', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/100001/destination').send({ destination: 'Agric Road, Ikorodu, Lagos' }).set('Accept', 'application/json').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Parcel destination was updated successfully' });
      }).end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', function () {
    it('should return a status code of 200 and change parcel order status', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/100002/status').send({ status: 'Delivered' }).set('Accept', 'application/json').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Parcel status was updated successfully' });
      }).end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', function () {
    it('should return a status code of 200 and change parcel order present location', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/100002/presentLocation').send({ presentLocation: 'Agric Road, Ikorodu, Lagos' }).set('Accept', 'application/json').expect(200).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ success: 'Parcel present location was updated successfully' });
      }).end(done);
    });
  });
});