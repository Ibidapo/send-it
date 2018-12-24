import express from 'express';

import parcelController from '../controller/parcelController';
import userController from '../controller/userController';
import parcelValidation from '../helper/validation/parcelValidation';
import authValidation from '../helper/validation/authValidation';

const router = express.Router();

// GET request to retreive parcels created by a user
router.get('/:id/parcels', parcelValidation.getParcelbyUser, parcelController.getParcelbyUser);

// PUT request to update user info by Id
router.put('/', authValidation.updateUser, userController.updateUser);

export default router;
