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
      [email, hash, isAdmin, joined], (error, results) => {
        if (error) {
          if (error.constraint === 'users_email_key') {
            return res.status(409).send({ error: 'User already exists' });
          }
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;

        return jwt.sign({ userId: rows[0].user_id, isAdmin: rows[0].is_admin },
          process.env.JWT_SECRET, (tokenError, token) => {
            if (tokenError) {
              return res.status(401).send({ error: 'Unexpected token error occurred' });
            }
            return res.status(201).send({ success: 'User was successfully registered', user: rows[0], token });
          });
      });
  }

  // method to validate user by Id
  static loginUser(req, res) {
    const { email, password } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1',
      [email], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(401).send({ error: 'User doesn\'t exists' });
        }

        const hash = rows[0].password;
        const isTrue = encryption.comparePassword(password, hash);

        if (isTrue !== true) {
          return res.status(401).send({ error: 'Password is invalid' });
        }

        return jwt.sign({ userId: rows[0].user_id, isAdmin: rows[0].is_admin },
          process.env.JWT_SECRET, (errs, token) => {
            if (errs) {
              return res.status(401).send({ error: 'Unexpected token error occurred' });
            }
            return res.status(200).send({ success: 'User was successfully logged in', user: rows[0], token });
          });
      });
  }
}

export default User;
