import jwt from 'jsonwebtoken';

import formatDate from '../helper/date/formatDate';
import pool from '../models/connection';
import encryption from '../helper/encryption/encrypt';

const { encryptPassword, comparePassword } = encryption;

// Utility class controlling every request made for a user
class User {
  // method to add user
  static registerUser(req, res, next) {
    const { email, password } = req.body;
    const hash = encryptPassword(password);
    const isAdmin = false;
    const joinedOn = formatDate();

    return pool.query('INSERT INTO users (email,  password, is_admin, joined_on) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hash, isAdmin, joinedOn], (error, results) => {
        if (error) {
          if (error.constraint === 'users_email_key') {
            return res.status(409).send({ error: 'User already exists' });
          }
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;
        req.user = rows;
        req.success = 'User was successfully registered';
        return next();
      });
  }

  // method to validate user by ID
  static loginUser(req, res, next) {
    const { email, password } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(401).send({ error: 'User doesn\'t exists' });
      }

      const hash = rows[0].password;
      const isTrue = comparePassword(password, hash);

      if (!isTrue) {
        return res.status(401).send({ error: 'Password is invalid' });
      }

      req.user = rows;
      req.success = 'User was successfully logged in';
      return next();
    });
  }

  // method to update user by ID
  static updateUser(req, res) {
    const { firstName, lastName, phone } = req.body;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    return pool.query('UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE user_id = $4 RETURNING *',
      [firstName, lastName, phone, userId], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;
        return res.status(200).send({ success: 'User was successfully updated', user: rows[0] });
      });
  }

  // method to upload user avatar
  static uploadAvatar(req, res) {
    const { file, typeError } = req;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    if (typeError) {
      return res.status(403).send({ error: typeError });
    }

    if (!file) {
      return res.status(400).send({ error: 'no file was uploaded' });
    }

    return pool.query('UPDATE users SET image_url = $1 WHERE user_id = $2 RETURNING *',
      [file.secure_url, userId], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;
        return res.status(200).send({ success: 'Image uploaded successfully', user: rows[0] });
      });
  }

  // method to verify user, who forgot password
  static forgotPassword(req, res, next) {
    const { email } = req.body;

    return pool.query('SELECT * FROM users WHERE email = $1',
      [email], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(401).send({ error: 'Email doesn\'t exists' });
        }
        req.user = rows;
        return next();
      });
  }

  // method to render reset password form
  static renderResetPassword(req, res) {
    const { token } = req.params;

    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).send({ error: 'Password reset token is invalid or has expired.' });
      }

      return res.send(`<div style="margin: 70px auto; width: 350px; text-align: center">
        <form action="/api/v1/auth/resetPassword" method="POST">
          <input type="hidden" name="token" value="${token}" />
          <input type="password" name="password" value="" placeholder="Enter your new password..." />
          <div style="margin: 15px auto">
            <input type="submit" value="Reset Password"/>
          </div>
        </form>
      </div>`);
    });
  }

  // method to reset password
  static resetPassword(req, res) {
    const { password, token } = req.body;

    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).send({ error: 'Password reset token is invalid or has expired.' });
      }

      const { email } = jwt.decode(token);
      const hash = encryption.encryptPassword(password);

      return pool.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
        [hash, email], (error, results) => {
          if (error) {
            return res.status(500).send({ error: 'Unexpected database error occurred' });
          }
          return res.status(200).send({ success: 'Password was successfully updated', user: results.rows[0] });
        });
    });
  }
}

export default User;
