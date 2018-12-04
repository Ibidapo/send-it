import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
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
};

export default authenticate;
