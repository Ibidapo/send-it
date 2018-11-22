import jwt from 'jsonwebtoken';

class authenticate {
  static token(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const error = 'Authentication failed';

    if (typeof bearerHeader === 'undefined') {
      return res.status(401).send({ error });
    }

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    return jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).send({ error });
      }
      return next();
    });
  }

  static admin(req, res, next) {
    const error = 'Authentication failed';

    return jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
      if (err || data.isAdmin === false) {
        return res.status(401).send({ error });
      }
      return next();
    });
  }
}

export default authenticate;
