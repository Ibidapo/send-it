import { check } from 'express-validator/check';

const checkEmail = [check('email').isEmail().withMessage('Enter a valid email address')];
const checkPassword = [check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters')];
const checkUser = [...checkEmail, ...checkPassword];

const validation = {
  checkRegisterUser: [...checkUser],
  checkLoginUser: [...checkUser],
  checkUpdateUser: [
    check('firstName').isLength({ min: 1 }).withMessage('First name cannot be empty'),
    check('lastName').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'),
  ],
  checkForgotPassword: [...checkEmail],
  checkResetPassword: [...checkPassword],
};

export default validation;
