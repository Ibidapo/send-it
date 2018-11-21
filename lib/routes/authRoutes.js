import express from 'express';

import validation from '../validation/authValidation';
import userController from '../controller/userController';

const router = express.Router();

// POST request to register user
router.post('/signup', validation.registerUser, userController.registerUser);

// POST request to login user
router.post('/login', validation.loginUser, userController.loginUser);

module.exports = router;
