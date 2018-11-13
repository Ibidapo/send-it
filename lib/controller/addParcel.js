import express from 'express';
import db from '../db/parcel';

const router = express.Router();

// Post request for a parcel
router.post('/parcels', (req, res) => {
  const newParcel = req.body;
  db.push(newParcel);

  res.send(db);
});

export default router;
