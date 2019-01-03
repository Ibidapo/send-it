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
    const message = `Order #${parcel[0].parcel_id} was successfully created.
    A dispatcher will call you within the next 2hrs to pickup the parcel. 
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, `[SendIT] Created Order #${parcel[0].parcel_id}`, body);
  }

  static cancelParcelMail(req) {
    const { parcel } = req;
    const message = `Order #${parcel[0].parcel_id} was successfully cancelled.
    Please note that this action cannot be reversered. 
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, `[SendIT] Cancelled Order #${parcel[0].parcel_id}`, body);
  }

  static changeDestinationMail(req) {
    const { parcel } = req;
    const message = `You have successfully updated the destination of Order #${parcel[0].parcel_id}.
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, `[SendIT] Updated Order #${parcel[0].parcel_id}`, body);
  }

  static changeStatusMail(req) {
    const { parcel } = req;
    const message = `Your Order #${parcel[0].parcel_id} status just got updated.
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, `[SendIT] Updated Order #${parcel[0].parcel_id}`, body);
  }

  static changePresentLocationMail(req) {
    const { parcel } = req;
    const message = `Your Order #${parcel[0].parcel_id} present location just got updated.
    <p>Thank you for choosing SendIT.</p>`;
    const body = template(message);

    sendNotification(parcel[0].user_id, `[SendIT] Updated Order #${parcel[0].parcel_id}`, body);
  }

  static forgotPasswordMail(req, res) {
    const { link, email } = req;
    const message = `You requested to reset your password. Please click on the following <a href='${link}'>link</a>. <p>This link is only valid for the next 30 minutes.</p>`;
    const body = template(message);

    sendMail(email, '[SendIT] Password Reset', body);
    res.status(200).send({ success: 'Kindly check your email for further instructions' });
  }
}

export default Notify;
