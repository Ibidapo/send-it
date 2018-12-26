import jwt from 'jsonwebtoken';

class Authenticate {
  // Method to verify token
  static verify(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const error = 'Authentication failed';

    if (typeof bearerHeader === 'undefined') {
      return res.status(403).send({ error });
    }

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    return jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).send({ error });
      }
      return next();
    });
  }

  // Method to sign token
  static sign(req, res) {
    const { user, success } = req;
    const userId = user[0].user_id;
    const isAdmin = user[0].is_admin;

    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, (error, token) => {
      if (error) {
        return res.status(401).send({ error: 'Unexpected token error occurred' });
      }
      return res.status(201).send({ success, user: user[0], token });
    });
  }
}

export default Authenticate;
