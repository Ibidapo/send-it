import jwt from 'jsonwebtoken';
import moment from 'moment';

import pool from '../models/connection';
import encryption from '../helper/encryption/bcrypt';

// Utility class controlling every request made for a user
class User {
  // method to add user
  static registerUser(req, res) {
    const { email, password } = req.body;
    const hash = encryption.encryptPassword(password);
    const joined = moment().format('L');
    const isAdmin = false;

    return pool.query('INSERT INTO users (email, password, is_admin, joined) VALUES ($1, $2, $3, $4)',
      [email, hash, isAdmin, joined], (err, results) => {
        if (err) {
          return res.status(400).send({ err, error: 'An error occurred' });
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
    const { email, password } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1',
      [email], (error, results) => {
        if (error) {
          return res.status(401).send({ error: 'An error occurred' });
        }

        const { rowCount, rows } = results;
        const hash = rows[0].password;
        const isTrue = encryption.comparePassword(password, hash);

        if (rowCount === 0 || isTrue !== true) {
          return res.status(400).send({ error: 'Email or Password is invalid' });
        }

        return jwt.sign({ userId: rows[0].user_id, isAdmin: rows[0].is_admin },
          process.env.JWT_SECRET, (err, token) => {
            if (err) {
              res.status(403).send({ error: 'Authentication failed' });
            }
            res.status(200).send({ success: 'User was successfully logged in', token });
          });
      });
  }
}

export default User;
