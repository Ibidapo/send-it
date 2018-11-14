import { validationResult } from 'express-validator/check';

import db from '../db/parcel';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add Parcel
  static addParcel(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).send({ error: errors.array() });
    }

    const newParcel = req.body;

    db.push(newParcel);
    res.send({ success: 'Your order was created successfully' });
  }

  // method to delete parcel by Id
  static deleteParcel(req, res) {
    const { id } = req.params;

    const foundParcel = db.filter((parcel) => {
      const { parcelId } = parcel;
      return parcelId.toString() === id.toString();
    });

    if (foundParcel.length === 0) {
      res.status(404).send({ error: 'Cannot fetch Parcel' });
    }

    db.splice(db.indexOf(foundParcel[0]), 1);
    res.status(200).send(db);
  }

  // method to get parcel by Id
  static getParcelbyId(req, res) {
    const { id } = req.params;

    const findParcel = db.filter((parcel) => {
      const { parcelId } = parcel;
      return parcelId.toString() === id.toString();
    });

    if (findParcel.length === 0) {
      res.status(404).send('Cannot fetch Parcel...');
    }

    res.status(200).send(findParcel[0]);
  }

  // method to get parcel by User ID
  static getParcelbyUser(req, res) {
    const { id } = req.params;

    const foundParcels = db.filter((parcel) => {
      const { userId } = parcel;
      return userId.toString() === id.toString();
    });

    if (foundParcels.length === 0) {
      res.status(404).send('Cannot fetch Parcel...');
    }

    res.status(200).send(foundParcels);
  }

  // method to get all parcels
  static getParcels(req, res) {
    // Check if parcel datastructure is empty
    if (db.length === 0) {
      res.status(404).send({ error: 'You have no orders' });
    }

    res.status(200).send(db);
  }
}

export default Parcel;
