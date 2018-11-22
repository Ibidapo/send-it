/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';

describe('SendIT Server - Authentication Routes', () => {
  // Testing for registration of user
  describe('/POST Request to register user', () => {
    it('should return a status code of 400 and and error message', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'funsho@example.com',
          password: 'orange',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'An error occurred' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for user login
  describe('/POST Request to login user', () => {
    it('should return a status code of 201 and login user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'dapsined@gmail.com',
          password: 'apple',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'User was successfully logged in', token: process.env.JWT_TOKEN });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
