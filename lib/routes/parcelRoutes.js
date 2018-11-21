import express from 'express';

import parcelController from '../controller/parcelController';
import validation from '../validation/parcelValidation';

const router = express.Router();

// Post request to add parcel order
router.post('/', validation.addParcel, parcelController.addParcel);

// Put request to cancel parcel order
router.put('/:id/cancel', validation.cancelParcel, parcelController.cancelParcel);

// Get request to retrieve a parcel order by Id
router.get('/:id', validation.getParcelbyId, parcelController.getParcelbyId);

// Get request to retrieve all parcel orders
router.get('/', parcelController.getParcels);

// Put request to change destination of a parcel order by Id
router.put('/:id/destination', validation.changeParcelDestination, parcelController.changeParcelDestination);

// Put request to change destination of a parcel order by Id
router.put('/:id/status', validation.changeParcelStatus, parcelController.changeParcelStatus);

// Put request to change destination of a parcel order by Id
router.put('/:id/presentLocation', validation.changeParcelPresentLocation, parcelController.changeParcelPresentLocation);

module.exports = router;
