const jwt = require('jsonwebtoken');
const config = require('config');
async function authMiddleWare(req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const payload = await jwt.verify(token, config.get('jwtPrivateKey'));
    req.params.tokenPayload = payload;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}

exports.authMiddleWare = authMiddleWare;
