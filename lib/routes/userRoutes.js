import express from 'express';

import parcelValidation from '../middleware/validation/parcelValidation';
import authValidation from '../middleware/validation/authValidation';
import checkResult from '../middleware/validation/validationResult';
import parcelController from '../controller/parcelController';
import userController from '../controller/userController';
import parser from '../helper/avatar/upload';

const router = express.Router();
const { checkUpdateUser } = authValidation;
const { checkGetParcelbyUser } = parcelValidation;
const { updateUser, uploadAvatar } = userController;
const { getParcelbyUser } = parcelController;

// GET request to retreive parcels created by a user
router.get('/:id/parcels', checkGetParcelbyUser, checkResult, getParcelbyUser);

// PUT request to update user info by Id
router.put('/', checkUpdateUser, checkResult, updateUser);

// POST request to update user avatar by Id
router.post('/avatar', parser.single('avatar'), uploadAvatar);

export default router;
