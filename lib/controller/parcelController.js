import db from '../db/parcel';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add Parcel
  static addParcel(req, res) {
    const newParcel = req.body;
    db.push(newParcel);
    res.send(db);
  }

  // method to delete parcel by Id
  static deleteParcel(req, res) {
    const { id } = req.params;

    const foundParcel = db.filter((parcel) => {
      const { parcelId } = parcel;
      return parcelId.toString() === id.toString();
    });

    if (foundParcel.length === 0) {
      res.status(404).send('Cannot fetch Parcel...');
    }

    db.splice(db.indexOf(foundParcel[0]), 1);

    res.send(db);
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

    res.send(findParcel[0]);
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

    res.send(foundParcels);
  }

  // method to get all parcels
  static getParcels(req, res) {
    res.send(db);
  }
}

export default Parcel;
