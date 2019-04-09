const jwt = require('jsonwebtoken');
const config = require('config');
async function permMiddleWare(req, res, next) {
  const { permission } = req.params.tokenPayload;
  if (!permission) res.status(403).send('Not authorized!');
  else next();
}

module.exports = permMiddleWare;
