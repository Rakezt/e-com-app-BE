const jwt = require('jsonwebtoken');
const User = require('../models/ecomUser');
const { error } = require('console');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ errors: ['Missing auth token'] });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ errors: ['Invalid auth Toekn'] });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: ['Token expired or missing'] });
  }
};
