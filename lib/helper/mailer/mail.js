import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

function sendMail(to, subject, html) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'no-reply@sendit.com',
    subject,
    html,
  };

  sgMail.send(msg);
}

export default sendMail;
