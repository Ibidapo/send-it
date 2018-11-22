/* eslint no-param-reassign: ["error", { "props": false }] */
import jwt from 'jsonwebtoken';
import moment from 'moment';

import pool from '../models/connection';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add parcel order
  static addParcel(req, res) {
    const {
      fromAddress,
      parcelKg,
      toAddress,
      toPhone,
    } = req.body;
    const presentLocation = fromAddress;
    const senderId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;
    const created = moment().format('L');

    return pool.query('INSERT INTO parcels (sender_id, parcel_kg, sender_address, recipient_address, status, present_location, recipient_phone, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [senderId, parcelKg, fromAddress, toAddress, 'In Transit', presentLocation, toPhone, created],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error, errorMsg: 'An error occured' });
        }
        const { rowCount } = results;
        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order was not created' });
        }
        return res.status(201).send({ success: 'Order was successfully created' });
      });
  }

  // method to cancel parcel order by Id
  static cancelParcel(req, res) {
    const { id } = req.params;

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3',
      ['Canceled', id, 'Delivered'],
      (error, results) => {
        if (error) {
          return res.status(400).send({ error, errorMsg: 'An error occured' });
        }
        const { rowCount } = results;
        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and cannot be updated' });
        }
        return res.status(200).send({ success: 'Order was canceled successfully' });
      });
  }

  // method to get all parcel orders
  static getParcels(req, res) {
    pool.query('SELECT * FROM parcels', (error, results) => {
      if (error) {
        return res.status(400).send({ error: 'An error occured' });
      }
      const { rows } = results;
      return rows.length > 0 ? res.status(200).send(rows)
        : res.status(200).send({ success: 'You have made no orders' });
    });
  }

  // method to get parcel order by Id
  static getParcelbyId(req, res) {
    const { id } = req.params;

    return pool.query('SELECT * FROM parcels WHERE parcel_id = $1', [id], (error, results) => {
      if (error) {
        return res.status(400).send({ error, errorMsg: 'Order was not found' });
      }
      const { rows } = results;
      return res.status(200).send({ success: 'Order was successfully retrieved', rows });
    });
  }

  // method to get parcel order by User ID
  static getParcelbyUser(req, res) {
    const { id } = req.params;

    return pool.query('SELECT * FROM parcels WHERE sender_id = $1', [id], (error, results) => {
      if (error) {
        return res.status(400).send({ error: 'An error occured' });
      }
      return res.status(200).send(results.rows);
    });
  }

  // method to change destination of a parcel order by Id
  static changeParcelDestination(req, res) {
    const { id } = req.params;
    const { destination } = req.body;

    return pool.query('UPDATE parcels SET recipient_address = $1 WHERE parcel_id = $2 AND status <> $3',
      [destination, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(400).send({ error, errorMsg: 'Parcel was not found' });
        }
        if (results.rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ success: 'Order destination was updated successfully' });
      });
  }

  // method to change present location of a parcel order by Id
  static changeParcelPresentLocation(req, res) {
    const { id } = req.params;
    const { presentLocation } = req.body;

    return pool.query('UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 AND status <> $3',
      [presentLocation, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(400).send({ error, errorMsg: 'Parcel was not found' });
        }
        if (results.rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ success: 'Order present location was updated successfully' });
      });
  }

  // method to change status of a parcel order by Id
  static changeParcelStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3',
      [status, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(400).send({ error, errorMsg: 'An error occurred' });
        }
        if (results.rowCount === 0) {
          return res.status(400).send({ error: 'Order status is Delivered and so cannot be updated' });
        }
        return res.status(200).send({ error: 'Order status was updated successfully' });
      });
  }
}

export default Parcel;
