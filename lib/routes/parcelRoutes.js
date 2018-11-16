import express from 'express';
import { check } from 'express-validator/check';

import parcelController from '../controller/parcelController';

const router = express.Router();

// Post request to add parcel order
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
  check('status').optional(),
  check('presentLocation').isLength({ min: 1 }).withMessage('Present Location field cannot be empty'),
], parcelController.addParcel);

// Put request to cancel parcel order
router.put('/:id/cancel', parcelController.cancelParcel);

// Get request to retrieve a parcel order by Id
router.get('/:id', parcelController.getParcelbyId);

// Get request to retrieve all parcel orders
router.get('/', parcelController.getParcels);

// Put request to change destination of a parcel order by Id
router.put('/:id/destination', [
  check('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty'),
], parcelController.changeParcelDestination);

// Put request to change destination of a parcel order by Id
router.put('/:id/status', [
  check('status').isLength({ min: 1 }).withMessage('status field cannot be empty'),
], parcelController.changeParcelStatus);

// Put request to change destination of a parcel order by Id
router.put('/:id/presentLocation', [
  check('presentLocation').isLength({ min: 1 }).withMessage('present location field cannot be empty'),
], parcelController.changeParcelPresentLocation);

module.exports = router;
