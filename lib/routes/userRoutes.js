import express from 'express';

import parcelController from '../controller/parcelController';

const router = express.Router();

router.get('/:id/parcels', parcelController.getParcelbyUser);


module.exports = router;
