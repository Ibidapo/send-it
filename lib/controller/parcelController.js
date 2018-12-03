/* eslint no-param-reassign: ["error", { "props": false }] */
import jwt from 'jsonwebtoken';
import moment from 'moment';

import pool from '../models/connection';
import emailNotification from '../helper/mailer/mail';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add parcel order
  static addParcel(req, res) {
    const {
      origin,
      parcelKg,
      destination,
      toPhone,
    } = req.body;
    const presentLocation = origin;
    const senderId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;
    const created = moment().format('L');

    return pool.query('INSERT INTO parcels (sender_id, parcel_kg, sender_address, recipient_address, status, present_location, recipient_phone, created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [senderId, parcelKg, origin, destination, 'In Transit', presentLocation, toPhone, created],
      (error, results) => {
        if (error || results.rowCount === 0) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;
        return res.status(201).send({ success: 'Order created', parcel: rows[0] });
      });
  }

  // method to cancel parcel order by Id
  static cancelParcel(req, res) {
    const { id } = req.params;
    const senderId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      ['Cancelled', id, 'Delivered'],
      (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }

        if (parseInt(senderId, 10) !== parseInt(rows[0].sender_id, 10)) {
          return res.status(403).send({ error: 'Access Denied' });
        }
        return res.status(200).send({ success: 'Order was cancelled', parcel: rows[0] });
      });
  }

  // method to get all parcel orders
  static getParcels(req, res) {
    const isSenderAdmin = jwt.decode(req.headers.authorization.split(' ')[1]).isAdmin;

    pool.query('SELECT * FROM parcels', (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (!isSenderAdmin) {
        return res.status(403).send({ error: 'Access Denied' });
      }
      return rowCount > 0
        ? res.status(200).send({ success: 'Order(s) retrieved', parcels: rows.reverse() })
        : res.status(204).send({ success: 'No orders available' });
    });
  }

  // method to get parcel order by Id
  static getParcelbyId(req, res) {
    const { id } = req.params;

    return pool.query('SELECT * FROM parcels WHERE parcel_id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(404).send({ error: 'Order doesn\'t exist' });
      }
      return res.status(200).send({ success: 'Order retrieved', parcel: rows[0] });
    });
  }

  // method to get parcel order by User ID
  static getParcelbyUser(req, res) {
    const { id } = req.params;
    const senderId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;

    return pool.query('SELECT * FROM parcels WHERE sender_id = $1', [id], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(404).send({ error: 'User doesn\'t exist' });
      }

      if (parseInt(senderId, 10) !== parseInt(rows[0].sender_id, 10)) {
        return res.status(403).send({ error: 'Access Denied' });
      }
      return res.status(200).send({ success: 'Order(s) retrieved', parcels: rows.reverse() });
    });
  }

  // method to change destination of a parcel order by Id
  static changeParcelDestination(req, res) {
    const { id } = req.params;
    const { destination } = req.body;
    const senderId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;

    return pool.query('UPDATE parcels SET recipient_address = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      [destination, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }

        if (parseInt(senderId, 10) !== parseInt(rows[0].sender_id, 10)) {
          return res.status(403).send({ error: 'Access Denied' });
        }
        return res.status(200).send({ success: 'Order\'s destination updated', parcel: rows[0] });
      });
  }

  // method to change present location of a parcel order by Id
  static changeParcelPresentLocation(req, res) {
    const { id } = req.params;
    const { presentLocation } = req.body;
    const isSenderAdmin = jwt.decode(req.headers.authorization.split(' ')[1]).isAdmin;

    return pool.query('UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      [presentLocation, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }

        if (!isSenderAdmin) {
          return res.status(403).send({ error: 'Access Denied' });
        }
        return res.status(200).send({ success: 'Order\'s present location updated', parcel: rows[0] });
      });
  }

  // method to change status of a parcel order by Id
  static changeParcelStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const isSenderAdmin = jwt.decode(req.headers.authorization.split(' ')[1]).isAdmin;

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      [status, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }

        if (!isSenderAdmin) {
          return res.status(403).send({ error: 'Access Denied' });
        }

        return res.status(200).send({ success: 'Order\'s status updated', parcel: rows[0] });
      });
  }
}

export default Parcel;
