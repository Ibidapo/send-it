import express from 'express';

import db from '../db/parcel';
import parcelFunc from './parcelsFunc';

const router = express.Router();

// Get request to fetch a specific parcel
router.get('/parcels/:id', (req, res) => {
  const { id } = req.params;
  const findParcel = parcelFunc(db, id);

  if (findParcel.length === 0) {
    res.status(404).send('Cannot fetch Parcel...');
  }

  res.send(findParcel[0]);
});

export default router;
