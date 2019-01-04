import { check } from 'express-validator/check';

const checkEmail = [check('email').isEmail().withMessage('Enter a valid email address')];
const checkPassword = [check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')];
const checkUser = [...checkEmail, ...checkPassword];

const validation = {
  checkRegisterUser: [...checkUser],
  checkLoginUser: [...checkUser],
  checkUpdateUser: [
    check('firstName').isLength({ min: 1 }).withMessage('First name cannot be empty'),
    check('lastName').isLength({ min: 1 }).withMessage('Last name cannot be empty'),
    check('phone').matches(/^\d{11}$/).withMessage('Phone must be 11 digits'),
  ],
  checkForgotPassword: [...checkEmail],
  checkResetPassword: [...checkPassword],
};

export default validation;
