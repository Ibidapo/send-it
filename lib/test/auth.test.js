/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';

import app from '../index';

describe('SendIT Server - Authentication Routes', () => {
  // Testing for registration of user
  describe('/POST Request to register user', () => {
    // Tests for already existing User
    it('should return a status code of 409 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ibidapo.rasheed@gmail.com',
          password: 'apple',
        })
        .set('Accept', 'application/json')
        .expect(409)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'User already exists' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for User with invalid credentials
    it('should return a status code of 401 and and error message', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ibidapo.rasheed@gmail.com',
          password: '',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Password cannot be less than 4 characters' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for User with invalid credentials
    it('should return a status code of 401 and and error message', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: '@gmail.com',
          password: 'apple',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Enter a valid email address' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for user login
  describe('/POST Request to login user', () => {
    // Tests for User with valid credentials
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ibidapo.rasheed@gmail.com',
          password: 'apple',
        })
        .set('Accept', 'application/json')
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'User was successfully logged in');
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for User with invalid credentials
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ibidapo.rasheed@gmail.com',
          password: 'pineapple',
        })
        .set('Accept', 'application/json')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Password is invalid' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for non-existent User
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ibidapo.rasheed@gmail.com',
          password: '',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Password cannot be less than 4 characters' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for non-existent User
    it('should return a status code of 401 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ibidapo.rasheed@example.com',
          password: 'pineapple',
        })
        .set('Accept', 'application/json')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'User doesn\'t exists' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for non-existent User
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '@example.com',
          password: 'pineapple',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Enter a valid email address' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for user information update
  describe('/POST Request to update user information', () => {
    // Tests for user update with valid information
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .put('/api/v1/users/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          firstName: 'Ibidapo',
          lastName: 'Rasheed',
          phone: '08011223344',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', 'User was successfully updated');
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for user update with invalid first name
    it('should return a status code of 400 and first name error', (done) => {
      request(app)
        .put('/api/v1/users/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          firstName: '',
          lastName: 'Rasheed',
          phone: '08011223344',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'First name cannot be empty' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for user update with invalid last name
    it('should return a status code of 400 and last name error', (done) => {
      request(app)
        .put('/api/v1/users/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          firstName: 'Ibidapo',
          lastName: '',
          phone: '08011223344',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Last name cannot be empty' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for non-existent User
    it('should return a status code of 400 and last name error', (done) => {
      request(app)
        .put('/api/v1/users/')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .send({
          firstName: 'Ibidapo',
          lastName: 'Rasheed',
          phone: '',
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
    // Test for update user info without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .put('/api/v1/users/')
        .set('Authorization', 'Bearer')
        .send({
          firstName: 'Ibidapo',
          lastName: 'Rasheed',
          phone: '08011223344',
        })
        .set('Accept', 'application/json')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for registration of user
  describe('/POST Request to update user avatar', () => {
    // Tests for already existing User
    it('should return a status code of 500 and error message', (done) => {
      request(app)
        .post('/api/v1/users/avatar')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'no file was uploaded' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Test for update user info without token
    it('should return a status code of 403 and error message', (done) => {
      request(app)
        .post('/api/v1/users/avatar')
        .set('Authorization', 'Bearer')
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Authentication failed' });
        })
        .end(done);
    });
  });

  // Testing for forgot password
  describe('/POST Request to forgot password', () => {
    // Tests for forgot password with valid email
    it('should return a status code of 200 and success message', (done) => {
      request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({
          email: 'test@gmail.com',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ success: 'Kindly check your email for further instructions' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for forgot password with non-existent email
    it('should return a status code of 401 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({
          email: 'test@example.com',
        })
        .set('Accept', 'application/json')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Email doesn\'t exists' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for forgot password with invalid email
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/forgotPassword')
        .send({
          email: 'test@',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Enter a valid email address' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // Testing for reset password
  describe('/POST Request to reset password', () => {
    // Tests for reset password without token
    it('should return a status code of 403 and invalid token error', (done) => {
      request(app)
        .post('/api/v1/auth/resetPassword')
        .send({
          password: 'pineapple',
        })
        .expect(403)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Password reset token is invalid or has expired.' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    // Tests for reset password with empty pasword field
    it('should return a status code of 400 and error message', (done) => {
      request(app)
        .post('/api/v1/auth/resetPassword')
        .send({
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'Password cannot be less than 4 characters' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
