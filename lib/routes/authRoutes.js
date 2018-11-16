import express from 'express';
import { check } from 'express-validator/check';

import userController from '../controller/userController';

const router = express.Router();

router.post('/signup', [
  check('userId').optional(),
  check('firstName').optional(),
  check('lastName').optional(),
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
], userController.addUser);

router.post('/login', [
  check('email').isEmail().withMessage('Enter a valid email address'),
  check('password').isLength({ min: 4 }).withMessage('Password cannot be less than 4 characters'),
], userController.validateUser);

module.exports = router;
