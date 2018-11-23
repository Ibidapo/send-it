import jwt from 'jsonwebtoken';
import moment from 'moment';

import pool from '../models/connection';
import encryption from '../helper/encryption/bcrypt';

// Utility class controlling every request made for a user
class User {
  // method to add user
  static registerUser(req, res) {
    const { email, password, isAdmin } = req.body;
    const hash = encryption.encryptPassword(password);
    const joined = moment().format('L');

    return pool.query('INSERT INTO users (email, password, is_admin, joined) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hash, isAdmin, joined], (err, results) => {
        if (err || results.rowCount === 0) {
          return res.status(400).send({ error: 'Error occurred' });
        }

        const { rows } = results;

        return jwt.sign({ userId: rows[0].user_id, isAdmin: rows[0].is_admin },
          process.env.JWT_SECRET, (errs, token) => {
            if (errs) {
              return res.status(403).send({ error: 'User authentication failed' });
            }
            return res.status(200).send({ success: 'User was successfully registered', user: rows[0], token });
          });
      });
  }

  // method to validate user by Id
  static loginUser(req, res) {
    const { email, password } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1',
      [email], (error, results) => {
        if (error || results.rowCount === 0) {
          return res.status(401).send({ error: 'Error occurred' });
        }

        const { rows } = results;
        const hash = rows[0].password;
        const isTrue = encryption.comparePassword(password, hash);

        if (isTrue !== true) {
          return res.status(400).send({ error: 'Email or Password is invalid' });
        }

        return jwt.sign({ userId: rows[0].user_id, isAdmin: rows[0].is_admin },
          process.env.JWT_SECRET, (errs, token) => {
            if (errs) {
              return res.status(403).send({ error: 'User authentication failed' });
            }
            return res.status(200).send({ success: 'User was successfully logged in', user: rows[0], token });
          });
      });
  }
}

export default User;
