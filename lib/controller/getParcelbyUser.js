import express from 'express';
import db from '../db/parcel';

const router = express.Router();

// Get request to fetch all parcels by a User
router.get('/users/:id/parcels', (req, res) => {
  const { id } = req.params;

  // findParcels = findParcelByUser(id);
  const findParcels = db.filter((parcel) => {
    const { userId } = parcel;
    return userId.toString() === id.toString();
  });

  if (findParcels.length === 0) {
    res.status(404).send('Cannot fetch Parcel...');
  }

  res.send(findParcels);
});

export default router;
