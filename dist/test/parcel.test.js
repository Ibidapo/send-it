'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _connection = require('../models/connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Testing for SendIT Server
/* eslint-env mocha */

describe('SendIT Server - Parcel Enpoints', function () {
  // Testing for GET all parcels
  describe('Request to get all parcels', function () {
    it('should return a status code of 200 and all parcels', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/parcels').expect(200).expect(function (res) {
        _connection2.default.query('SELECT * FROM parcels', function (error, results) {
          var rows = results.rows;

          if (rows.length > 0) {
            (0, _expect2.default)(res.body).toEqual(rows);
          } else {
            (0, _expect2.default)(res.body).toEqual({ success: 'You have made no orders' });
          }
        });
      }).end(done);
    });
  });

  // Testing for GET parcel by Id
  describe('/GET Request to retrieve a parcel order by Parcel Id', function () {
    it('should return a status code of 200 and retrieve a parcel order', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/parcels/1').expect(200).expect(function (res) {
        _connection2.default.query('SELECT * FROM parcels WHERE parcel_id = $1', [1], function (error, results) {
          if (error) {
            (0, _expect2.default)(res.body).toEqual({ error: error, errorMsg: 'Order was not found' });
          } else {
            var rows = results.rows;

            (0, _expect2.default)(res.body).toEqual({ success: 'Order was successfully retrieved', rows: rows });
          }
        });
      }).end(done);
    });
  });

  // Testing for GET parcel by User
  describe('/GET Request to retrieve a parcel order by User ID', function () {
    it('should return a status code of 200 and retrieve a parcel order', function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/v1/users/1/parcels').expect(200).expect(function (res) {
        _connection2.default.query('SELECT * FROM parcels WHERE sender_id = $1', [1], function (error, results) {
          if (error) {
            (0, _expect2.default)(res.body).toEqual({ error: 'An error occured' });
          } else {
            var rows = results.rows;

            (0, _expect2.default)(res.body).toEqual(rows);
          }
        });
      }).end(done);
    });
  });

  // Testing for POST parcel
  describe('/POST Request to add parcel order', function () {
    it('should return a status code of 201 and add parcel order', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/parcels/').send({
        fromAddress: 'Bariga, Lagos.',
        parcelKg: '16',
        toAddress: 'Herbert Macaulay Rd, Lagos.',
        toPhone: '08099999999',
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
    it('should return a status code of 400 and error message', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/1/cancel').expect(400).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ error: 'Order status is Delivered and cannot be updated' });
      }).end(done);
    });
  });

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', function () {
    it('should return a status code of 400 and error message', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/1/destination').send({ destination: 'Agric Road, Ikorodu, Lagos' }).set('Accept', 'application/json').expect(400).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
      }).end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', function () {
    it('should return a status code of 400 and error message', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/1/status').send({ status: 'In Transit' }).set('Accept', 'application/json').expect(400).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
      }).end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', function () {
    it('should return a status code of 400 and error message', function (done) {
      (0, _supertest2.default)(_index2.default).put('/api/v1/parcels/1/presentLocation').send({ presentLocation: 'Agric Road, Ikorodu, Lagos' }).set('Accept', 'application/json').expect(400).expect(function (res) {
        (0, _expect2.default)(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
      }).end(done);
    });
  });
});