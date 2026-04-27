const { verifyToken } = require('../utils/token');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.auth = verifyToken(token);
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;
