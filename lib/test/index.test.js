/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';
import parcels from '../db/parcel';

// Testing for SendIT Server
describe('SendIT Server', () => {
  // Testing for GET all parcels
  describe('Request to get all parcels', () => {
    it('should return a status code of 200 and all parcels', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(parcels);
        })
        .end(done);
    });
  });
  // Testing for GET parcel by Id
  describe('Request to get parcel by Id', () => {
    it('should return a status code of 200 and a parcel', (done) => {
      request(app)
        .get('/api/v1/parcels/100001')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(parcels[0]);
        })
        .end(done);
    });
  });
  // Testing for GET parcel by User
  describe('Request to get parcel by User', () => {
    it('should return a status code of 200 and a parcel', (done) => {
      request(app)
        .get('/api/v1/users/900000/parcels')
        .expect(200)
        .expect((res) => {
          expect(res.body).toContainEqual(parcels[0]);
        })
        .end(done);
    });
  });
  // Testing for POST parcel
  describe('Request to add parcel', () => {
    it('should return a status code of 200 and add parcel', (done) => {
      const newParcel = {
        parcelId: 100004,
        userId: 900000,
        from: {
          address: 'Surulere, Lagos.',
          weight: 16,
        },
        to: {
          address: 'Maryland, Lagos.',
          phone: '08011111111',
        },
        presentLocation: 'Ikorodu Road, Lagos.',
      };

      request(app)
        .post('/api/v1/parcels/')
        .send(newParcel)
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toContainEqual(newParcel);
        })
        .end((err, res) => {
          const param = err || res;
          return param === err ? done(err) : done();
        });
    });
  });
  // Testing for PUT parcel
  describe('Request to delete parcel', () => {
    it('should return a status code of 200 and delete parcel', (done) => {
      request(app)
        .put('/api/v1/parcels/100001/cancel')
        .expect(200)
        .expect((res) => {
          expect(res.body).not.toContainEqual({
            parcelId: 100001,
            userId: 900000,
            from: {
              address: 'Yaba, Lagos.',
              weight: 12.5,
            },
            to: {
              address: 'Lekki, Lagos',
              phone: '08011111111',
            },
            presentLocation: 'Third Mainland Bridge, Lagos.',
          });
        })
        .end(done);
    });
  });
});
