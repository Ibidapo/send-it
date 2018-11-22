import { check, validationResult } from 'express-validator/check';

const validation = {
  registerUser: [
    check('firstName').optional(),
    check('lastName').optional(),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
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
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
};

export default validation;
