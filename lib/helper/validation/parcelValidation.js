import { check, validationResult } from 'express-validator/check';

const validation = {
  addParcel: [
    check('fromAddress').isLength({ min: 1 }).withMessage('Sender Address cannot be empty'),
    check('toAddress').isLength({ min: 1 }).withMessage('Recipient Address cannot be empty'),
    check('parcelKg').matches(/^\d+\.?\d*$/).withMessage('Parcel weight must be a number'),
    check('toPhone').isLength({ min: 11 }).matches(/^\d{11}$/).withMessage('Phone must be 11 digits'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
  cancelParcel: [
    check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
  getParcelbyId: [
    check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
  changeParcelDestination: [
    check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number'),
    check('destination').isLength({ min: 1 }).withMessage('Destination field cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
  changeParcelStatus: [
    check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number'),
    check('status').isIn(['In Transit', 'Delivered', 'Cancelled']).withMessage('status is invalid'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
  changeParcelPresentLocation: [
    check('id').matches(/^\d+$/).withMessage('Parcel Id must be a number'),
    check('presentLocation').isLength({ min: 1 }).withMessage('Present location field cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      return next();
    },
  ],
};

export default validation;
