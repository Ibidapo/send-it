/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';

// Testing for SendIT Server
describe('SendIT Server - Parcel Routes', () => {
  // Testing for GET all parcels
  describe('/GET Request to get all parcels', () => {
    // Test for parcels by valid user(admin)
    it('should return a status code of 200 and all parcels', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order(s) retrieved');
        })
        .end(done);
    });
    // Test for parcels by invalid user(not admin)
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Access Denied' });
        })
        .end(done);
    });
    // Test for parcels without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for GET parcel by Id
  describe('/GET Request to retrieve a parcel order by Parcel Id', () => {
    // Test for parcel with valid id
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .get('/api/v1/parcels/1')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order retrieved');
        })
        .end(done);
    });
    // Test for parcel with invalid id
    it('should return a status code of 404 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels/01234')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist' });
        })
        .end(done);
    });
    // Test to retrieve parcel without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels/01234')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for GET parcel by User
  describe('/GET Request to retrieve a parcel order by User ID', () => {
    // Test for parcels by invalid User
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/users/1/parcels')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Access Denied' });
        })
        .end(done);
    });
    // Test for parcels by valid User
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/users/11/parcels')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order(s) retrieved');
        })
        .end(done);
    });
    // Test for parcels without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/users/1/parcels')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for POST parcel
  describe('/POST Request to add parcel order', () => {
    // Test for empty Origin field
    it('should return a status code of 400 and sender address error', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          origin: '',
          parcelKg: '16',
          destination: 'Bariga, Lagos.',
          toPhone: '08099999999',
          quote: '3000',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Sender Address cannot be empty' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    //  Test for empty Destination field
    it('should return a status code of 400 and recipient address error', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          origin: 'Bariga, Lagos.',
          parcelKg: '16',
          destination: '',
          toPhone: '08099999999',
          quote: '3000',
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
    // Test for valid phone number
    it('should return a status code of 400 and phone number error', (done) => {
      request(app)
        .post('/api/v1/parcels/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          origin: 'Ikorodu, Lagos',
          parcelKg: '16',
          destination: 'Mushin, Lagos',
          toPhone: '0901122',
          quote: '3000',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Phone must be 11 digits' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Test for parcels without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels/')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for cancellation of parcel order
  describe('/PUT Request to cancel parcel order', () => {
    // Test to cancel parcel that doesn't exist
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/cancel')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
    // Test to cancel non-existent parcel
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .get('/api/v1/parcels/1/cancel')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order destination
  describe('/PUT Request to change parcel order destination', () => {
    // Test to change destination of non-existent parcel
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .put('/api/v1/parcels/11/destination')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order\'s destination updated');
        })
        .end(done);
    });
    // Test to change destination of non-existent parcel
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
    // Test to change destination of parcel with invalid info
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/destination')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({ destination: '' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Destination field cannot be empty' });
        })
        .end(done);
    });
    // Test to change destination without token
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/11/destination')
        .set('Authorization', 'Bearer')
        .send({ destination: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order status', () => {
    // Test for update of parcel status by invalid user
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .put('/api/v1/parcels/21/status')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ status: 'In Transit' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order\'s status updated');
        })
        .end(done);
    });
    // Test for update of delivered parcel order status
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/status')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ status: 'In Transit' })
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
    // Test for update of parcel status by invalid user(not admin)
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/status')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({ status: 'In Transit' })
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Access Denied' });
        })
        .end(done);
    });
    // Test for update of parcel status by invalid user(not admin)
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/status')
        .set('Authorization', 'Bearer')
        .send({ status: 'In Transit' })
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for change of parcel order status
  describe('/PUT Request to change parcel order present location', () => {
    // Test for update of parcel order present location by admin
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .put('/api/v1/parcels/21/presentLocation')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'Order\'s present location updated');
        })
        .end(done);
    });
    // Test for update of delivered parcel order present location
    it('should return a status code of 400 and invalid error', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Order doesn\'t exist or has been delivered' });
        })
        .end(done);
    });
    // Test for update of parcel order present location with empty field
    it('should return a status code of 400 and empty field error', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
        .send({ presentLocation: '' })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Present location field cannot be empty' });
        })
        .end(done);
    });
    // Test for update of parcel order present location with user token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Access Denied' });
        })
        .end(done);
    });
    // Test for update of parcel order present location without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .put('/api/v1/parcels/1/presentLocation')
        .set('Authorization', 'Bearer')
        .send({ presentLocation: 'Agric Road, Ikorodu, Lagos' })
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });
});
