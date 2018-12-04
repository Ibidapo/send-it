import express from 'express';

import parcelController from '../controller/parcelController';
import validation from '../helper/validation/parcelValidation';

const router = express.Router();

router.get('/:id/parcels', validation.getParcelbyUser, parcelController.getParcelbyUser);

module.exports = router;
