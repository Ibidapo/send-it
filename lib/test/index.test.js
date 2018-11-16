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
  describe('/GET Request to retrieve a parcel order by Parcel Id', () => {
    it('should return a status code of 200 and retrieve a parcel order', (done) => {
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
  describe('/GET Request to retrieve a parcel order by User ID', () => {
    it('should return a status code of 200 and retrieve a parcel order', (done) => {
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
  describe('/POST Request to add parcel order', () => {
    it('should return a status code of 201 and add parcel order', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .send({
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
    it('should return a status code of 200 and delete parcel', (done) => {
      request(app)
        .put('/api/v1/parcels/100001/cancel')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Order was successfully canceled' });
        })
        .end(done);
    });
  });

  // Testing for registration of user
  describe('/POST Request to register user', () => {
    it('should return a status code of 201 and register user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userId: '',
          email: 'funsho@example.com',
          firstName: '',
          lastName: '',
          password: 'orange',
        })
        .set('Accept', 'application/json')
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'User was successfully registered' });
        })
        .end((err, res) => {
          const param = err || res;
          return param === err ? done(err) : done();
        });
    });
  });

  // Testing for user login
  describe('/POST Request to login user', () => {
    it('should return a status code of 201 and login user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'dapo@example.com',
          password: 'mango',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'User was successfully logged in' });
        })
        .end((err, res) => {
          const param = err || res;
          return param === err ? done(err) : done();
        });
    });
  });

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', () => {
    it('should return a status code of 200 and change parcel order destination', (done) => {
      request(app)
        .put('/api/v1/parcels/100001/destination')
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Parcel destination was updated successfully' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', () => {
    it('should return a status code of 200 and change parcel order status', (done) => {
      request(app)
        .put('/api/v1/parcels/100002/status')
        .send({ status: 'Delivered' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Parcel status was updated successfully' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', () => {
    it('should return a status code of 200 and change parcel order present location', (done) => {
      request(app)
        .put('/api/v1/parcels/100002/presentLocation')
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Parcel present location was updated successfully' });
        })
        .end(done);
    });
  });
});
