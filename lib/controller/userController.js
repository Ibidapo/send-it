import { validationResult } from 'express-validator/check';

import pool from '../models/connection';

// Utility class controlling every request made for a user
class User {
  // method to add user
  static registerUser(req, res) {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }

    const { email, password } = req.body;

    return pool.query('INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password], (error, results) => {
        if (error) {
          return res.status(400).send({ error: 'An error occurred' });
        }
        const { rowCount } = results;
        if (rowCount === 0) {
          return res.status(400).send({ error: 'User was not registered' });
        }
        return res.status(201).send({ success: 'User was successfully registered' });
      });
  }

  // method to validate user by Id
  static loginUser(req, res) {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }

    const { email, password } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password], (error, results) => {
        if (error) {
          return res.status(400).send({ error: 'An error occurred' });
        }
        const { rowCount } = results;
        if (rowCount === 0) {
          return res.status(400).send({ error: 'Username or Password is invalid' });
        }
        return res.status(200).send({ success: 'User was successfully logged in' });
      });
  }
}

export default User;
