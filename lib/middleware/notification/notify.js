import template from '../../helper/mailer/template';
import sendMail from '../../helper/mailer/mail';

import pool from '../../models/connection';

const sendNotification = (userId, subject, body) => {
  pool.query('SELECT email FROM users WHERE user_id = $1', [userId], (error, result) => {
    if (!error) {
      sendMail(result.rows[0].email, subject, body);
    }
  });
};

class Notify {
  static addParcelMail(req) {
    const { parcel } = req;
    const subject = `[SendIT] Created Order #${parcel[0].parcel_id}`;
    const message = `Order #${parcel[0].parcel_id} was successfully created.
    A dispatcher will call you within the next 2hrs to pickup the parcel. 
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, subject, body);
  }

  static cancelParcelMail(req) {
    const { parcel } = req;
    const subject = `[SendIT] Cancelled Order #${parcel[0].parcel_id}`;
    const message = `Order #${parcel[0].parcel_id} was successfully cancelled.
    Please note that this action cannot be reversered. 
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, subject, body);
  }
}

export default Notify;
