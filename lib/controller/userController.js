import jwt from 'jsonwebtoken';
import moment from 'moment';

import pool from '../models/connection';
import encryption from '../helper/encryption/bcrypt';
import emailNotification from '../helper/mailer/mail';

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

  static updateUser(req, res) {
    const { firstName, lastName } = req.body;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    return pool.query('UPDATE users SET first_name = $1, last_name = $2 WHERE user_id = $3 RETURNING *',
      [firstName, lastName, userId], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'User doesn\'t exists' });
        }
        return res.status(200).send({ success: 'User was successfully updated', user: rows[0] });
      });
  }

  static forgotPassword(req, res) {
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

        return jwt.sign({ email: rows[0].email, exp: Math.floor(Date.now() / 1000) + (30 * 60) },
          process.env.JWT_SECRET, (errs, token) => {
            if (errs) {
              return res.status(401).send({ error: 'Unexpected token error occurred' });
            }
            const link = `http://localhost:3000/api/v1/auth/resetPassword/${token}`;

            emailNotification(email, '[SendIT] Password Reset', `Hey, <br><br> You requested to reset your password. Please click on the following <a href='${link}'>link</a> <br><br> This link is only valid for the next 30 minutes.`);
            return res.status(200).send({ success: 'Kindly check your email for further instructions' });
          });
      });
  }

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

  static resetPassword(req, res) {
    const { password, token } = req.body;

    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).send({ error: 'Password reset token is invalid or has expired.' });
      }

      const { email } = jwt.decode(token);
      const hash = encryption.encryptPassword(password);

      return pool.query('UPDATE users SET password = $1 WHERE email = $2',
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
