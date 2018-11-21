import { check } from 'express-validator/check';

const validation = {
  addParcel: [
    check('fromAddress').isLength({ min: 1 }).withMessage('Sender Address cannot be empty'),
    check('toAddress').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'),
    check('parcelKg').matches('[0-9]+').withMessage('Parcel weight must be a number'),
    check('toPhone').isLength({ min: 11 }).matches('[0-9]+').withMessage('Phone must be 11 digits'),
    check('presentLocation').isLength({ min: 1 }).withMessage('Present Location cannot be empty'),
  ],
  cancelParcel: [
    check('id').matches('[0-9]+').withMessage('Parcel Id must be a number'),
  ],
  getParcelbyId: [
    check('id').matches('[0-9]+').withMessage('Parcel Id must be a number'),
  ],
  changeParcelDestination: [
    check('id').matches('[0-9]+').withMessage('Parcel Id must be a number'),
    check('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty'),
  ],
  changeParcelStatus: [
    check('id').matches('[0-9]+').withMessage('Parcel Id must be a number'),
    check('status').isIn(['In Transit', 'Delivered', 'Cancel']).withMessage('status is invalid'),
  ],
  changeParcelPresentLocation: [
    check('id').matches('[0-9]+').withMessage('Parcel Id must be a number'),
    check('presentLocation').isLength({ min: 1 }).withMessage('present location field cannot be empty'),
  ],
  errorFormatter({
    location,
    msg,
    param,
    value,
    nestedErrors,
  }) {
    return {
      type: 'Error',
      location,
      message: msg,
      param,
      value,
      nestedErrors,
    };
  },
};

export default validation;
