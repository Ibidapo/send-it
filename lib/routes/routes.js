import express from 'express';
import addParcel from '../controller/addParcel';
import deleteParcel from '../controller/deleteParcel';
import getParcelbyId from '../controller/getParcelbyId';
import getParcelbyUser from '../controller/getParcelbyUser';
import getParcels from '../controller/getParcels';

const router = express.Router();

router.use('/api/v1', addParcel);
router.use('/api/v1', deleteParcel);
router.use('/api/v1', getParcelbyId);
router.use('/api/v1', getParcelbyUser);
router.use('/api/v1', getParcels);

module.exports = router;
