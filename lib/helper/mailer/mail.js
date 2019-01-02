import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function sendMail(to, subject, html) {
  // nodemailer.createTestAccount((err, account) => {
  // // create reusable transporter object using the default SMTP transport
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: account.user, // generated ethereal user
  //       pass: account.pass, // generated ethereal password
  //     },
  //   });

  //   // setup email data with unicode symbols
  //   const mailOptions = {
  //     from: '"SendIT" <admin@send-it.com>', // sender address
  //     to, // list of receivers
  //     subject, // Subject line
  //     html: text, // plain text body
  //   };

  //   // send mail with defined transport object
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Message sent: %s', info.messageId);
  //       // Preview only available when sending through an Ethereal account
  //       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //     }
  //   });
  // });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: '1033716445283-tca6uj9gv6trn0ao1un83tpi4acvi1ro.apps.googleusercontent.com',
      clientSecret: '9rWAHyMi9jWW_H8fMBHXkE0w',
      refreshToken: '1/ZgVWGINZTIjmAvqYOHSli5w9bg_62DqwRK1X-8bx5y0',
      accessToken: 'ya29.GluFBpzr_CZOSCfGpE2uFVBRG7PnSaNeAKUk9rMOxED97UcvxxLfCCVlQ3pWPtHd92kpSCaKsz1DHolKib5Jg8xeR4JJiec6uFNl8Skrt50HeRjxpBuW-SllbGP_',
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"SendIT" <admin@send-it.com>',
    to,
    subject,
    html,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

export default sendMail;
