import express from 'express';

import parcelController from '../controller/parcelController';

const router = express.Router();

router.post('/', parcelController.addParcel);
router.put('/:id/cancel', parcelController.deleteParcel);
router.get('/:id', parcelController.getParcelbyId);
router.get('/', parcelController.getParcels);

module.exports = router;
