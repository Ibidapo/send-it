import express from 'express';
import { check } from 'express-validator/check';

import parcelController from '../controller/parcelController';

const router = express.Router();

router.post('/', [
  check('parcelId').exists().matches('[0 - 9]'),
  check('userId').exists().matches('[0 - 9]'),
  check('from').exists().custom((value) => {
    if (value.address === '' || value.weight === '') {
      return false;
    }
    return value;
  }).withMessage('Address or Weight cannot be empty'),
  check('to').exists().custom((value) => {
    if (value.address === '' || value.phone === '') {
      return false;
    }
    return value;
  }).withMessage('Address or Phone cannot be empty'),
  check('presentLocation').exists(),
], parcelController.addParcel);

router.put('/:id/cancel', parcelController.deleteParcel);
router.get('/:id', parcelController.getParcelbyId);
router.get('/', parcelController.getParcels);

module.exports = router;
