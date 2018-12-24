import { check, validationResult } from 'express-validator/check';

const validation = {
  registerUser: [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
      }
      return next();
    },
  ],
  loginUser: [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
      }
      return next();
    },
  ],
  updateUser: [
    check('firstName').isLength({ min: 1 }).withMessage('First name cannot be empty'),
    check('lastName').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
      }
      return next();
    },
  ],
  forgotPassword: [
    check('email').isEmail().withMessage('Enter a valid email address'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
      }
      return next();
    },
  ],
  resetPassword: [
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
      }
      return next();
    },
  ],
};

export default validation;
