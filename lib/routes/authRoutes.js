import express from 'express';

import validation from '../helper/validation/authValidation';
import userController from '../controller/userController';

const router = express.Router();

// POST request to register user
router.post('/signup', validation.registerUser, userController.registerUser);

// POST request to login user
router.post('/login', validation.loginUser, userController.loginUser);

// GET request to confirm user and send reset password link
router.post('/forgotPassword', validation.forgotPassword, userController.forgotPassword);

// GET request to render password page and form
router.put('/resetPassword', validation.resetPassword, userController.resetPassword);

module.exports = router;
