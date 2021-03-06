import express from 'express';

import validation from '../middleware/validation/parcelValidation';
import checkResult from '../middleware/validation/validationResult';
import controller from '../controller/parcelController';
import notify from '../middleware/notification/notify';

const router = express.Router();
const {
  checkAddParcel,
  checkCancelParcel,
  checkGetParcelbyId,
  checkChangeParcelDestination,
  checkChangeParcelStatus,
  checkChangeParcelPresentLocation,
} = validation;
const {
  addParcel,
  cancelParcel,
  getParcels,
  getParcelbyId,
  changeParcelDestination,
  changeParcelStatus,
  changeParcelPresentLocation,
} = controller;
const {
  addParcelMail,
  cancelParcelMail,
  changeDestinationMail,
  changeStatusMail,
  changePresentLocationMail,
} = notify;

// Post request to add parcel order
router.post('/', checkAddParcel, checkResult, addParcel, addParcelMail);

// Put request to cancel parcel order
router.put('/:id/cancel', checkCancelParcel, checkResult, cancelParcel, cancelParcelMail);

// Get request to retrieve a parcel order by Id
router.get('/:id', checkGetParcelbyId, checkResult, getParcelbyId);

// Get request to retrieve all parcel orders
router.get('/', getParcels);

// Put request to change destination of a parcel order by Id
router.put('/:id/destination', checkChangeParcelDestination, checkResult, changeParcelDestination, changeDestinationMail);

// Put request to change destination of a parcel order by Id
router.put('/:id/status', checkChangeParcelStatus, checkResult, changeParcelStatus, changeStatusMail);

// Put request to change destination of a parcel order by Id
router.put('/:id/presentLocation', checkChangeParcelPresentLocation, checkResult, changeParcelPresentLocation, changePresentLocationMail);

export default router;
