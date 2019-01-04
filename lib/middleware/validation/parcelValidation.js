import { check } from 'express-validator/check';

const checkParcelId = [check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number')];

const validation = {
  checkAddParcel: [
    check('origin').isLength({ min: 1 }).withMessage('Sender Address cannot be empty'),
    check('destination').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'),
    check('parcelKg').matches(/^\d+\.?\d*$/).withMessage('Parcel weight must be a number'),
    check('toPhone').matches(/^\d{11}$/).withMessage('Phone must be 11 digits'),
    check('quote').matches(/^\d+$/).withMessage('Quote must be a number'),
  ],
  checkCancelParcel: [...checkParcelId],
  checkGetParcelbyId: [...checkParcelId],
  checkGetParcelbyUser: [
    check('id').matches(/^\d+$/).withMessage('User Id must be a number'),
  ],
  checkChangeParcelDestination: [
    ...checkParcelId,
    check('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty'),
  ],
  checkChangeParcelStatus: [
    ...checkParcelId,
    check('status').isIn(['In Transit', 'Delivered', 'Cancelled']).withMessage('status is invalid'),
  ],
  checkChangeParcelPresentLocation: [
    ...checkParcelId,
    check('presentLocation').isLength({ min: 1 }).withMessage('Present location field cannot be empty'),
  ],
};

export default validation;
