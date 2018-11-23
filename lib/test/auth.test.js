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
          email: 'dapsined@example.com',
          password: 'apple',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Error occurred' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for user login
  describe('/POST Request to login user', () => {
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'dapsined@gmail.com',
          password: 'pineapple',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Email or Password is invalid' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
