/* eslint no-param-reassign: ["error", { "props": false }] */
import jwt from 'jsonwebtoken';

import formatDate from '../helper/date/formatDate';
import pool from '../models/connection';
import emailNotification from '../helper/mailer/mail';

// Utility class controlling every request made for a parcel
class Parcel {
  // method to add parcel order
  static addParcel(req, res, next) {
    const {
      origin,
      parcelKg,
      destination,
      quote,
      toPhone,
    } = req.body;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);
    const createdOn = formatDate();
    const quoteNum = parseInt(quote, 10);
    const weightNum = parseFloat(parcelKg);

    return pool.query('INSERT INTO parcels (user_id, origin, destination, parcel_kg, quote, status, present_location, recipient_phone, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [userId, origin, destination, weightNum, quoteNum, 'In Transit', origin, toPhone, createdOn],
      (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows } = results;
        req.parcel = rows;
        res.status(201).send({ success: 'Order created', parcels: rows[0] });
        return next();
      });
  }

  // method to cancel parcel order by Id
  static cancelParcel(req, res) {
    const { id } = req.params;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND user_id = $3 AND status <> $4 RETURNING *', ['Cancelled', id, userId, 'Delivered'], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
      }
      return res.status(200).send({ success: 'Order was cancelled', parcels: rows[0] });
    });
  }

  // method to get all parcel orders
  static getParcels(req, res) {
    const { isAdmin } = jwt.decode(req.headers.authorization.split(' ')[1]);

    if (!isAdmin) {
      return res.status(403).send({ error: 'Access Denied' });
    }

    return pool.query('SELECT * FROM parcels ORDER BY parcel_id DESC', (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(404).send({ error: 'Order doesn\'t exist' });
      }
      return rowCount > 0
        ? res.status(200).send({ success: 'Order(s) retrieved', parcels: rows })
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
      return res.status(200).send({ success: 'Order retrieved', parcels: rows[0] });
    });
  }

  // method to get parcel order by User ID
  static getParcelbyUser(req, res) {
    const { id } = req.params;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    if (parseInt(id, 10) !== parseInt(userId, 10)) {
      return res.status(403).send({ error: 'Access Denied' });
    }

    return pool.query('SELECT * FROM parcels WHERE user_id = $1 ORDER BY parcel_id DESC',
      [id], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(404).send({ error: 'No Order(s) exist' });
        }
        return res.status(200).send({ success: 'Order(s) retrieved', parcels: rows.reverse() });
      });
  }

  // method to change destination of a parcel order by Id
  static changeParcelDestination(req, res) {
    const { id } = req.params;
    const { destination } = req.body;
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);

    return pool.query('UPDATE parcels SET destination = $1 WHERE parcel_id = $2 AND user_id = $3 AND status <> $4 RETURNING *', [destination, id, userId, 'Delivered'], (error, results) => {
      if (error) {
        return res.status(500).send({ error: 'Unexpected database error occurred' });
      }

      const { rows, rowCount } = results;

      if (rowCount === 0) {
        return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
      }
      return res.status(200).send({ success: 'Order\'s destination updated', parcels: rows[0] });
    });
  }

  // method to change present location of a parcel order by Id
  static changeParcelPresentLocation(req, res) {
    const { id } = req.params;
    const { presentLocation } = req.body;
    const { isAdmin } = jwt.decode(req.headers.authorization.split(' ')[1]);

    if (!isAdmin) {
      return res.status(403).send({ error: 'Access Denied' });
    }

    return pool.query('UPDATE parcels SET present_location = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      [presentLocation, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }
        return res.status(200).send({ success: 'Order\'s present location updated', parcels: rows[0] });
      });
  }

  // method to change status of a parcel order by Id
  static changeParcelStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { isAdmin } = jwt.decode(req.headers.authorization.split(' ')[1]);
    let senderId;
    let parcelId;

    if (!isAdmin) {
      return res.status(403).send({ error: 'Access Denied' });
    }

    return pool.query('UPDATE parcels SET status = $1 WHERE parcel_id = $2 AND status <> $3 RETURNING *',
      [status, id, 'Delivered'], (error, results) => {
        if (error) {
          return res.status(500).send({ error: 'Unexpected database error occurred' });
        }

        const { rows, rowCount } = results;

        if (rowCount === 0) {
          return res.status(400).send({ error: 'Order doesn\'t exist or has been delivered' });
        }

        senderId = rows[0].sender_id;
        parcelId = rows[0].parcel_id;

        pool.query('SELECT email FROM users WHERE user_id = $1', [senderId], (err, result) => {
          if (!err) {
            emailNotification(result.rows[0].email, `[# ${parcelId}]`, `parcel #${parcelId} status was updated`);
          }
        });
        return res.status(200).send({ success: 'Order\'s status updated', parcels: rows[0] });
      });
  }
}

export default Parcel;
