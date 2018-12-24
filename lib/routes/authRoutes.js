import express from 'express';

import validation from '../helper/validation/authValidation';
import userController from '../controller/userController';

const router = express.Router();

// POST request to register user
router.post('/signup', validation.registerUser, userController.registerUser);

// POST request to login user
router.post('/login', validation.loginUser, userController.loginUser);

// POST request to confirm user and send reset password link
router.post('/forgotPassword', validation.forgotPassword, userController.forgotPassword);

// GET request to render password reset form
router.get('/resetPassword/:token', userController.renderResetPassword);

// POST request to update password
router.post('/resetPassword', validation.resetPassword, userController.resetPassword);

export default router;
