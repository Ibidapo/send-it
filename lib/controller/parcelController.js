/* eslint no-param-reassign: ["error", { "props": false }] */

import { validationResult } from 'express-validator/check';

import db from '../db/parcel';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add parcel order
  static addParcel(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send({ error: errors.array() });
    }

    const newParcel = req.body;

    db.push(newParcel);
    return res.status(201).send({ success: 'Order was successfully created' });
  }

  // method to cancel parcel order by Id
  static cancelParcel(req, res) {
    const { id } = req.params;

    const isChanged = db.some((parcel) => {
      const { parcelId } = parcel;

      if (parcelId.toString() === id.toString()) {
        parcel.status = 'Canceled';
        return true;
      }

      return false;
    });

    if (isChanged) {
      res.status(200).send({ success: 'Order was successfully canceled' });
    } else {
      res.status(404).send({ error: 'Parcel was not found' });
    }
  }

  // method to get parcel order by Id
  static getParcelbyId(req, res) {
    const { id } = req.params;

    const findParcel = db.filter((parcel) => {
      const { parcelId } = parcel;
      return parcelId.toString() === id.toString();
    });

    if (findParcel.length === 0) {
      res.status(404).send({ error: 'Parcel was not found' });
    }

    res.status(200).send(findParcel[0]);
  }

  // method to get parcel order by User ID
  static getParcelbyUser(req, res) {
    const { id } = req.params;

    const foundParcels = db.filter((parcel) => {
      const { userId } = parcel;
      return userId.toString() === id.toString();
    });

    if (foundParcels.length === 0) {
      res.status(404).send({ error: 'Parcel was not found' });
    }

    res.status(200).send(foundParcels);
  }

  // method to get all parcel orders
  static getParcels(req, res) {
    // Check if parcel datastructure is empty
    if (db.length === 0) {
      res.status(404).send({ error: 'You have no orders' });
    }

    res.status(200).send(db);
  }

  // method to change destination of a parcel order by Id
  static changeParcelDestination(req, res) {
    const { id } = req.params;
    const { destination } = req.body;

    const isChanged = db.some((parcel) => {
      const { parcelId } = parcel;

      if (parcelId.toString() === id.toString()) {
        parcel.to.address = destination;
        return true;
      }

      return false;
    });

    if (isChanged) {
      res.status(200).send({ success: 'Parcel destination was updated successfully' });
    } else {
      res.status(404).send({ error: 'Parcel was not found' });
    }
  }

  // method to change present location of a parcel order by Id
  static changeParcelPresentLocation(req, res) {
    const { id } = req.params;
    const { presentLocation } = req.body;

    const isChanged = db.some((parcel) => {
      const { parcelId } = parcel;

      if (parcelId.toString() === id.toString()) {
        parcel.presentLocation = presentLocation;
        return true;
      }

      return false;
    });

    if (isChanged) {
      res.status(200).send({ success: 'Parcel present location was updated successfully' });
    } else {
      res.status(404).send({ error: 'Parcel was not found' });
    }
  }

  // method to change status of a parcel order by Id
  static changeParcelStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const isChanged = db.some((parcel) => {
      const { parcelId } = parcel;

      if (parcelId.toString() === id.toString()) {
        parcel.status = status;
        return true;
      }

      return false;
    });

    if (isChanged) {
      res.status(200).send({ success: 'Parcel status was updated successfully' });
    } else {
      res.status(404).send({ error: 'Parcel was not found' });
    }
  }
}

export default Parcel;
