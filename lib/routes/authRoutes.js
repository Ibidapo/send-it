import express from 'express';

import validation from '../middleware/validation/authValidation';
import checkResult from '../middleware/validation/validationResult';
import authenticate from '../middleware/authentication/authenticate';
import controller from '../controller/userController';
import notify from '../middleware/notification/notify';

const router = express.Router();
const {
  checkRegisterUser, checkLoginUser, checkForgotPassword, checkResetPassword,
} = validation;
const {
  registerUser, loginUser, forgotPassword, renderResetPassword, resetPassword,
} = controller;
const { sign, signEmail } = authenticate;
const { forgotPasswordMail } = notify;

// POST request to register user
router.post('/signup', checkRegisterUser, checkResult, registerUser, sign);

// POST request to login user
router.post('/login', checkLoginUser, checkResult, loginUser, sign);

// POST request to confirm user and send reset password link
router.post('/forgotPassword', checkForgotPassword, checkResult, forgotPassword, signEmail, forgotPasswordMail);

// GET request to render password reset form
router.get('/resetPassword/:token', renderResetPassword);

// POST request to update password
router.post('/resetPassword', checkResetPassword, checkResult, resetPassword);

export default router;
