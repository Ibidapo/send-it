import { check } from 'express-validator/check';

const validation = {
  registerUser: [
    check('firstName').optional(),
    check('lastName').optional(),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
  ],
  loginUser: [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
  ],
  errorFormatter({
    location,
    msg,
    param,
    value,
    nestedErrors,
  }) {
    return {
      type: 'Error',
      location,
      message: msg,
      param,
      value,
      nestedErrors,
    };
  },
};

export default validation;
