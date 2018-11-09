import express from 'express';
import db from '../db/parcel';

const router = express.Router();

// Get request to fetch all the parcels
router.get('/parcels', (req, res) => {
  res.send(db);
});

export default router;
