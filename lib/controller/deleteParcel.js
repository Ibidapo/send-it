import express from 'express';

import db from '../db/parcel';
import { parcelbyId } from './parcelsFunc';

const router = express.Router();

// Put request to cancel a specific order
router.put('/parcels/:id/cancel', (req, res) => {
  const { id } = req.params;

  // findParcel = findParcel(id);
  const findParcel = parcelbyId(db, id);

  if (findParcel.length === 0) {
    res.status(404).send('Cannot fetch Parcel...');
  }

  db.splice(db.indexOf(findParcel[0]), 1);

  res.send(db);
});

export default router;
