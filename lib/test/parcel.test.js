/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';
import pool from '../models/connection';

// Testing for SendIT Server
describe('SendIT Server - Parcel Enpoints', () => {
  // Testing for GET all parcels
  describe('Request to get all parcels', () => {
    it('should return a status code of 200 and all parcels', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .expect(200)
        .expect((res) => {
          pool.query('SELECT * FROM parcels', (error, results) => {
            const { rows } = results;
            if (rows.length > 0) {
              expect(res.body).toEqual(rows);
            } else {
              expect(res.body).toEqual({ success: 'You have made no orders' });
            }
          });
        })
        .end(done);
    });
  });

  // Testing for GET parcel by Id
  describe('/GET Request to retrieve a parcel order by Parcel Id', () => {
    it('should return a status code of 200 and retrieve a parcel order', (done) => {
      request(app)
        .get('/api/v1/parcels/1')
        .expect(200)
        .expect((res) => {
          pool.query('SELECT * FROM parcels WHERE parcel_id = $1', [1], (error, results) => {
            if (error) {
              expect(res.body).toEqual({ error, errorMsg: 'Order was not found' });
            } else {
              const { rows } = results;
              expect(res.body).toEqual({ success: 'Order was successfully retrieved', rows });
            }
          });
        })
        .end(done);
    });
  });

  // Testing for GET parcel by User
  describe('/GET Request to retrieve a parcel order by User ID', () => {
    it('should return a status code of 200 and retrieve a parcel order', (done) => {
      request(app)
        .get('/api/v1/users/1/parcels')
        .expect(200)
        .expect((res) => {
          pool.query('SELECT * FROM parcels WHERE sender_id = $1', [1], (error, results) => {
            if (error) {
              expect(res.body).toEqual({ error: 'An error occured' });
            } else {
              const { rows } = results;
              expect(res.body).toEqual(rows);
            }
          });
        })
        .end(done);
    });
  });

  // Testing for POST parcel
  describe('/POST Request to add parcel order', () => {
    it('should return a status code of 201 and add parcel order', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .send({
          fromAddress: 'Bariga, Lagos.',
          parcelKg: '16',
          toAddress: 'Herbert Macaulay Rd, Lagos.',
          toPhone: '08099999999',
          presentLocation: 'Ikorodu Road, Lagos.',
        })
        .set('Accept', 'application/json')
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Order was successfully created' });
        })
        .end((err, res) => {
          const param = err || res;
          return param === err ? done(err) : done();
        });
    });
  });

  // Testing for cancellation of parcel order
  describe('/PUT Request to cancel parcel order', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/cancel')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order status is Delivered and cannot be updated' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/status')
        .send({ status: 'In Transit' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order status is Delivered and so cannot be updated' });
        })
        .end(done);
    });
  });
});
