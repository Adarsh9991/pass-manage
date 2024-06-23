const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const auth = async (req, res, next) => {
  const token = await req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
