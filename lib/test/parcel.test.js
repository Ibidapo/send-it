/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';
import pool from '../models/connection';

// Testing for SendIT Server
describe('SendIT Server - Parcel Routes', () => {
  // Testing for GET all parcels
  describe('/GET Request to get all parcels', () => {
    it('should return a status code of 200 and all parcels', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .expect(200)
        .expect((res) => {
          pool.query('SELECT * FROM parcels', (error, results) => {
            if (error) {
              expect(res.body).toEqual({ error: 'Unexpected database error occurred' });
            }
            const { rows, rowCount } = results;
            if (rowCount > 0) {
              expect(res.body).toEqual({ success: 'Order(s) retrieved', parcels: rows.reverse() });
            } else {
              expect(res.body).toEqual({ success: 'No orders available' });
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
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .expect(200)
        .expect((res) => {
          pool.query('SELECT * FROM parcels WHERE parcel_id = $1', [1], (error, results) => {
            if (error) {
              expect(res.body).toEqual({ error: 'Unexpected database error occurred' });
            } else {
              const { rows, rowCount } = results;
              if (rowCount > 0) {
                expect(res.body).toEqual({ success: 'Order retrieved', parcel: rows[0] });
              } else {
                expect(res.body).toEqual({ error: 'Order doesn\'t exist' });
              }
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
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Access Denied' });
        })
        .end(done);
    });
  });

  // Testing for POST parcel
  describe('/POST Request to add parcel order', () => {
    it('should return a status code of 400 and add parcel order', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send({
          origin: 'Bariga, Lagos.',
          parcelKg: '16',
          destination: '',
          toPhone: '08099999999',
          presentLocation: 'Ikorodu Road, Lagos.',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Recipient Address cannot be empty' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for cancellation of parcel order
  describe('/PUT Request to cancel parcel order', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/cancel')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/status')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send({ status: 'In Transit' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
  });
});
