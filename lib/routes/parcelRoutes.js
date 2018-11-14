import express from 'express';

import parcelController from '../controller/parcelController'

const router = express.Router();

router.post('/api/v1', addParcel);
router.put('/api/v1', deleteParcel);
router.get('/api/v1', getParcelbyId);
router.get('/api/v1', getParcelbyUser);
router.get('/api/v1', getParcels);

module.exports = router;