import { validationResult } from 'express-validator/check';

import db from '../db/user';

// Utility class controlling every request made for a user
class User {
  // method to add user
  static addUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }

    const newUser = req.body;

    db.push(newUser);
    return res.status(201).send({ success: 'User was successfully registered' });
  }

  // method to validate user by Id
  static validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send({ error: errors.array() });
    }

    const { email, password } = req.body;
    const isUserValid = db.some((user) => {
      const userEmail = user.email.toString();
      const userPass = user.password.toString();

      return userEmail === email.toString() && userPass === password.toString();
    });

    return isUserValid ? res.status(200).send({ success: 'User was successfully logged in' }) : res.status(401).send({ error: 'Username or Password is invalid' });
  }
}

export default User;
