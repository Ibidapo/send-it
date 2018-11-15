import express from 'express';
import { check } from 'express-validator/check';

import parcelController from '../controller/parcelController';

const router = express.Router();

router.post('/', [
  check('parcelId').isLength({ min: 6 }).matches('[0 - 9]').withMessage('Parcel ID is invalid'),
  check('userId').isLength({ min: 6 }).matches('[0 - 9]').withMessage('User ID invalid'),
  check('from').custom((value) => {
    if (value.address === '' || value.weight === '') {
      return false;
    }
    return value;
  }).withMessage('Address or Weight cannot be empty'),
  check('to').custom((value) => {
    if (value.address === '' || value.phone === '') {
      return false;
    }
    return value;
  }).withMessage('Address or Phone cannot be empty'),
  check('presentLocation').isLength({ min: 1 }).withMessage('Present Location field cannot be empty'),
], parcelController.addParcel);
router.put('/:id/cancel', parcelController.deleteParcel);
router.get('/:id', parcelController.getParcelbyId);
router.get('/', parcelController.getParcels);

module.exports = router;
